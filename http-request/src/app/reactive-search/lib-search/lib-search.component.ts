import { HttpClient, HttpParams } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss']
})
export class LibSearchComponent implements OnInit {

  queryField = new FormControl()
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  // EM https://api.cdnjs.com/libraries TEMOS TODOS OS
  // PARAMETROS DISPONIVEIS PARA FAZER AS REQUESTS NAS LIBS
  results$: Observable<any>
  total: number
  readonly FIELDS = "name,description,version,homepage"

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.results$ = this.queryField.valueChanges
    .pipe(
      // PARA REMOVER ESPAÇOS DIGITADOS APÓS O TEXTO PESQUISADO
      map(value => value.trim()),
      // PARA NÃO FAZER A CHAMADA COM APENAS 1 CHARACTERE DE PESQUISA
      filter(value => value.length>1),
      // PARA CONSIDERAR UM TEMPO MAIOR ENTRE CARACTERES DIGITADOS
      debounceTime(200),
      // PARA APENAS CHAMAR QUANDO O CONTEUDO DO INPUT REALMENTE MUDE APÓS CADA CARACTERE DIGITADO
      distinctUntilChanged(),
      // APÓS O RETORNO DA REQUEST, FAZEMOS UMANOVA, USANDO switchMap
      switchMap(value=> this.http.get(this.SEARCH_URL, {
        params:{
          search: value,
          fields: this.FIELDS
        }
      })),
      // FINALMENTE ATRIBUINDO OS VALORES RECEBIDOS E TRATADOS
      // PARA A VARIAVEL TOTAL
      tap((res:any)=> this.total = res.total), // <=> exemplo do uso do tap para atribuição de valores durante uma sequencia de eventos no observable
      map((res:any)=>res.results)


    )
  }

  // TODA A LOGICA DA FUNAÇÃO ABAIXO FOI
  // APLICADA E ADAPTADA PARA EXECUÇÃO COM O CHANGEVALUE DO INPUT 
  onSearch(){
    const fields = "name,description,version,homepage"
    let value = this.queryField.value
    
    const params = {
      search: value,
      fields: fields
    }

    // CRIANDO O OBJETO DE PARAMETROS DINAMICAMENTE
    // USANDO HttpParams()
    // let params = new HttpParams();
    // params = params.set('search', value)
    // params = params.set('fields', fields)    

    if( value && (value =  value.trim()!=="")){
      // this.results$ = this.http.get(`${this.SEARCH_URL}?fields=${fields}&search=${value}`) 
      this.results$ = this.http.get(this.SEARCH_URL, {params}) // <= usando objeto para lista de parametros na URL
      .pipe(
        tap((res:any) => this.total = res.total),
        map((res:any)=> res.results)
      )
    }
  }
}
