import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusService } from './status.service';

export class Entity {
  constructor(
    public id: number,
    public name: string,
    public description: string[]
  ) {}
}

export function getTime(): string {
  const now = new Date();
  return (
    now.getHours() +
    ':' +
    now.getMinutes() +
    ':' +
    (now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()) +
    '.' +
    now.getMilliseconds()
  );
}

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  clubs: Entity[] = [];
  members: Entity[] = [];

  constructor(private statusService: StatusService) {
    new Array(7)
      .fill('')
      .forEach((_, index) =>
        this.clubs.push(
          new Entity(index, 'Code Monkey Club ' + index, [
            'Lorem ipsum dolor sit',
            'amet consectetur adipisicing elit.',
            'Enim excepturi odio cum eligendi,',
            'veniam dolores, fuga autem ...',
          ])
        )
      );
    new Array(10)
      .fill('')
      .forEach((_, index) =>
        this.members.push(
          new Entity(index, 'Monkey ' + index, ['Ready for project Chaos'])
        )
      );
  }

  getClubs(): Observable<Entity[]> {
    this.statusService.addMessage(getTime(), 'Request GET /clubs');
    const obs$ = new Observable<Entity[]>((subscriber) => {
      setTimeout(() => {
        this.statusService.addMessage(getTime(), 'Response GET /clubs');
        subscriber.next(this.clubs);
        subscriber.complete();
      }, 1000);
    });
    return obs$;
  }

  addNewClub(): void {
    const id = this.clubs.length;
    this.clubs.push(
      new Entity(id, 'Yet another Code Monkey Club ' + id, [
        'Lorem ipsum dolor sit',
        'amet consectetur adipisicing elit.',
        'Enim excepturi odio cum eligendi,',
        'veniam dolores, fuga autem ...',
      ])
    );
  }

  getClubById(id: number): Observable<Entity> {
    this.statusService.addMessage(getTime(), `Request GET /club/${id}`);
    const obs$ = new Observable<Entity>((subscriber) => {
      setTimeout(() => {
        this.statusService.addMessage(getTime(), `Response GET /clubs/${id}`);
        const entity = this.clubs.find((e) => e.id === id);
        subscriber.next(entity);
        subscriber.complete();
      }, 500);
    });
    return obs$;
  }

  getClubRulez(clubId: number): Observable<Entity> {
    const obs$ = new Observable<Entity>((subscriber) => {
      this.statusService.addMessage(getTime(), `Request GET /club/${clubId}/rulez`);
      setTimeout(() => {
        this.statusService.addMessage(getTime(), `Response GET /club/${clubId}/rulez`);
        subscriber.next(
          new Entity(clubId, 'Club Rulez ' + clubId, [
            '#1 You do not talk about CODE MONKEY CLUB.',
            '#2 You DO NOT talk about CODE MONKEY CLUB.',
            '#3 If a PO says "stop" or goes limp, taps out the project is over.',
            '#4 Only two guys for pair programming.',
            '#5 Focus on one project at a coding session.',
            '#6 No shirts, no shoes. (Only if remote and hot)',
            '#7 Coding sessions will go on as long as they have to.',
            '#8 If this is your first project at CODE MONKEY CLUB, you HAVE to code.',
          ])
        );
        subscriber.complete();
      }, 1500);
    });
    return obs$;
  }

  getMembers(): Observable<Entity[]> {
    const obs$ = new Observable<Entity[]>((subscriber) => {
      this.statusService.addMessage(getTime(), `Request GET /members`);
      setTimeout(() => {
        this.statusService.addMessage(getTime(), `Response GET /members`);
        subscriber.next(this.members);
        subscriber.complete();
      }, 200);
    });
    return obs$;
  }
}
