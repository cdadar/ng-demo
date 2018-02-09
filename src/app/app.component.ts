import { Component } from "@angular/core";
import { HeroService } from "./hero.service";
import { Hero } from "./hero";
import { OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [HeroService]
})
export class AppComponent implements OnInit {
  title = "Tour of Heroes";
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService) {}

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes=heroes);
  }
  
  ngOnInit(): void {
    this.getHeroes();
    console.log(this.heroes)
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
