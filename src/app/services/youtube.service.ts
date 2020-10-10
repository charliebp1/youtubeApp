import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apikey = 'AIzaSyCf3mWOhfm5LjoKuOuOnr68VhG8XJHqFhk';
  private playlist = 'UUZI27QrvtykHHeuVqoAfuxg';
  private nextPageToken = '';

  constructor( private http: HttpClient ) { 

  }

  getVideos(){

    const url = `${this.youtubeUrl}/playlistItems`;

    const params = new HttpParams().set('part', 'snippet')
                                   .set('maxResults', '5')
                                   .set('playlistId', this.playlist )
                                   .set('key', this.apikey )
                                   .set('pageToken', this.nextPageToken)
                                   
    return this.http.get<YoutubeResponse>(url, { params })
                    .pipe(
                        map(resp => {
                          this.nextPageToken = resp.nextPageToken;
                          return resp.items;
                        }),
                        map( items => items.map(video => video.snippet ))
                    )
  }
}
