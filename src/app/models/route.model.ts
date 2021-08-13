export class Route {
    chars: number = 0;
    days: number = 0;
    game: string = "";
    lines: number = 0;
    link: string = "";
    mins: number = 0;
    name: string = "";
}
export interface FireBaseItem{
    $key: string;
}

export class FBRoute extends Route implements FireBaseItem{
    $key: string = "";
}