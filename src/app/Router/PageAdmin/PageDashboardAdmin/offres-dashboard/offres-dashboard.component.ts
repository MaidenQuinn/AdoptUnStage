import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { OffreService } from 'src/app/services/offre.service';
import { Offre } from 'src/app/modeles/offre';

@Component({
  selector: 'app-offres-dashboard',
  templateUrl: './offres-dashboard.component.html',
  styleUrls: ['./offres-dashboard.component.css']
})
export class OffresDashboardComponent implements OnInit {
  displayedColumns: string[] = ['titre', 'secteur', 'pourvue'];
  public array: any;
  public offres: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  isMobile;
  pageEvent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private offreService: OffreService) { }

  applyFilter(filterValue: string) {
    this.offres.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.offreService.getAllOffres().subscribe
      (data => {
        this.offres = new MatTableDataSource<Offre[]>(data);
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
