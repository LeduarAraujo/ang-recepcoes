import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Espaco } from '../../core/models/espaco';
import { AtomicoJwtService } from '../../core/services/atomico-jwt.service';
import { ListarespacoResponse } from '../../core/models/listarespaco.response';

@Component({
  selector: 'app-consulta-agenda',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './consulta-agenda.component.html',
  styleUrls: ['./consulta-agenda.component.css']
})
export class ConsultaAgendaComponent implements AfterViewInit {

  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  daysInMonth: { date: number | null; reservation: string }[] = []; // Supondo que já está preenchido com os dados do mês
  remainingDatesText: string | null = null;
  weeklyAgendaText: string | null = null;
  weekdays: string[];
  currentDate: Date;
  months: string[];
  years: number[];

  token_jwt: string = 'asd';
  idFuncionario: number = 1;
  listaEspacos: Espaco[] = [];
  idEspacoSelecionado: number = 0;

  espaco: Espaco = {
    cdEspaco: 0,
    nmEspaco: '',
    dsEndereco: '',
    siAtivo: '',
    instagram: '',
    logoEspaco: '',
  };

  constructor(private atomicoJwtService: AtomicoJwtService) {
    const date = new Date();
    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();
    this.currentDate = new Date(this.currentYear, this.currentMonth);
    this.weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    this.months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    this.years = Array.from({ length: 21 }, (_, i) => this.currentYear - 10 + i); // Gera 21 anos (10 antes e 10 depois)
    this.daysInMonth = this.getDaysInMonth(this.currentMonth, this.currentYear);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.listarEspacos();
  }

  getDaysInMonth(month: number, year: number): { date: number | null; reservation: string }[] {
    const days: { date: number | null; reservation: string }[] = [];
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ date: null, reservation: '' });
    }
    const totalDays = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= totalDays; day++) {
      days.push({ date: day, reservation: '' });
    }
    return days;
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.updateCalendar();
  }

  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.updateCalendar();
  }

  exportRemainingDates() {
    const monthName = this.getMonthName(this.currentMonth);
    const remainingDates = this.daysInMonth
      .filter(day => !day.reservation && day.date)
      .map(day => day.date)
      .join(', ');

    this.weeklyAgendaText = null; // Limpa o texto da agenda semanal
    this.remainingDatesText = `${monthName} de ${this.currentYear}. Datas restantes: ${remainingDates}`;
  }

  exportWeeklyAgenda() {
    const monthName = this.getMonthName(this.currentMonth);
    const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const weeklyAgenda = this.daysInMonth
      .filter(day => day.reservation && day.date)
      .map(day => {
        const date = new Date(this.currentYear, this.currentMonth, day.date ?? 1);
        const weekday = weekdays[date.getDay()];
        return `${weekday} ${day.date} ( ${day.reservation} )`;
      })
      .join(', ');

    this.remainingDatesText = null; // Limpa o texto das datas restantes
    this.weeklyAgendaText = `${monthName} de ${this.currentYear}. Nesta semana haverá evento nos seguintes dias: ${weeklyAgenda}`;
  }

  getMonthName(monthIndex: number): string {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return months[monthIndex];
  }

  updateCalendar(): void {
    this.currentDate = new Date(this.currentYear, this.currentMonth);
    this.daysInMonth = this.getDaysInMonth(this.currentMonth, this.currentYear);

    this.consultarAgendaEspaco();
  }

  listarEspacos() {
    this.atomicoJwtService.listarEspacos(this.token_jwt, this.idFuncionario)
      .subscribe((response: ListarespacoResponse) => {
        this.listaEspacos = response.listaEspacos;
    }, err => alert(err.error.message));
  }

  consultarAgendaEspaco() {
    if (this.idEspacoSelecionado != null && this.idEspacoSelecionado != 0) {
      this.atomicoJwtService.getAgendaEspaco(this.token_jwt, this.idEspacoSelecionado, this.currentYear, this.currentMonth + 1)
        .subscribe((response: any) => {
          const agenda = response.agenda;
          for (let i = 0; i < this.daysInMonth.length; i++) {
            const day = this.daysInMonth[i];
            if (day.date && agenda[day.date]) {
              day.reservation = agenda[day.date].reservation || '';
            }
          }
        }, err => alert(err.error.message));
    }
  }
}
