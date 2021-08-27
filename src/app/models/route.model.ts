export class Item  {
    chars: number = 0;
    days: number = 0;
    lines: number = 0;
    link: string = "";
    mins: number = 0;
    name: string = "";
}

export class Route extends Item {
    game: string = "";
}
export interface FireBaseItem{
    $key: string;
}

export class FBRoute extends Route implements FireBaseItem{
    $key: string = "";
}