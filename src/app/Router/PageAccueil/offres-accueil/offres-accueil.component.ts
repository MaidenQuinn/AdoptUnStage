import { Component, OnInit, ViewChild } from '@angular/core';
import { Offre } from 'src/app/modeles/offre';
import { OffreService } from 'src/app/services/offre.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-offres-accueil',
  templateUrl: './offres-accueil.component.html',
  styleUrls: ['./offres-accueil.component.css']
})
export class OffresAccueilComponent implements OnInit {
  displayedColumns: string[] = [
    'logo',
    'titre',
    'entreprise',
    'secteur',
    'ville',
    'codePostal',
    'detail'
  ];

  public offres2: any;
  public offresMobile: Offre[] = [];
  public array: any;
  public offres: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  isMobile;
  pageEvent;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(private offreService: OffreService) {}

  applyFilter(filterValue: string) {
    this.offres.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.offreService.getAllOffres().subscribe(data => {
      this.offres2 = data;
      for (let i = 0; i < this.offres2.length; i++) {
        this.offres2[i].dateDebut = moment(this.offres2[i].dateDebut).format('DD/MM/YYYY');
        this.offres2[i].dateFin = moment(this.offres2[i].dateFin).format('DD/MM/YYYY');
      }
      this.offres2.sort((offre, offre2) => offre2.id - offre.id);
      for (let i = 0; i < this.offres2.length; i++) {
        if (i < 3) {
          this.offresMobile.push(this.offres2[i]);
        }
      }
      this.offres = new MatTableDataSource<Offre[]>(this.offres2);
      setTimeout(() => {
        this.offres.paginator = this.paginator;
        this.offres.sort = this.sort;
      });
      this.array = data;
      this.totalSize = this.offres.length;
      this.iterator();
    });
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.array = part;
  }
}
