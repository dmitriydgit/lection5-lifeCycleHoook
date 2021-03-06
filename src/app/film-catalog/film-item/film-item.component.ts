import { Component, EventEmitter, Input, OnInit, Output, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { Film } from '../../film';

@Component({
	selector: 'app-film-item',
	templateUrl: './film-item.component.html',
	styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit {
	@Input() film: Film;
	@Input() counter: number;
	@Input() imgPath: string;
	@Output('star') starEmitter = new EventEmitter<Film>();
	@Output('book') bookEmitter = new EventEmitter<Film>();

	constructor(private hostElement: ElementRef) {
	}

	// получаем ссылку на конкретный DOM элемент компонента
	@ViewChild("name", { read: ElementRef }) nameDiv: ElementRef;

	ngOnInit() {
		console.log("Hook Child, Инициализация дочернего компонента");
		// this.nameDiv.nativeElement.innerHTML = "Здесь могло быть название фильма";
		// console.log("Отображаем хост элемент");
		// console.log(this.hostElement.nativeElement.outerHTML);
	}

	ngOnChanges(changes: SimpleChanges) {
		console.log("Hook Child, Проперти в дочернем компоненте поменялись");
		console.dir(changes);
		for (let key in changes) {
			console.log(`ключ = ${key}`)
			console.log(`            текущее значение = `);
			console.dir(changes[key].currentValue)
			console.log(`            предыдущее значение = `)
			console.dir(changes[key].previousValue)
		}
	}

	ngAfterContentInit() {
		console.log("Hook Child, Внешний контент установлен в дочерний компонент");
	}


	starFilm(film: Film) {
		this.starEmitter.emit(film);
	}
	bookFilm(film: Film) {
		this.bookEmitter.emit(film);
	}


	showFilmInfo() {
		console.log(this.film);
		return true;
	}

	formatPlr(popularity) {
		let pop = Math.round(+popularity);
		//console.log(pop)
		return pop;
	}
	formatDate(date) {
		let dt = new Date(date);
		return dt.getFullYear();

	}
}
