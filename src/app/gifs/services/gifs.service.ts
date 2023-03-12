import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = "K1dAAbxmgTkHQpIS5z2h5cVt0ueobWjJ";
  private _historial: string[] = [];

  //TODO: cambiar any por su tipo correspondiente
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem("historial")!) || [];
    this.resultados = JSON.parse(localStorage.getItem("resultados")!) || [];
    // if(localStorage.getItem("historial")) {
    //   this._historial = JSON.parse(localStorage.getItem("historial")!);
    // }
  }



  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase()
    if (!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem("historial", JSON.stringify(this._historial));
    }
    
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=K1dAAbxmgTkHQpIS5z2h5cVt0ueobWjJ&q=${query}&limit=10`)
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem("resultados", JSON.stringify(this.resultados));
      }); 
  }

  
}
