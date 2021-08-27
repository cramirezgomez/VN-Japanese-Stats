import { FireBaseItem, Item } from "./route.model";

export class Game extends Item{
    chars: number = 0;
    days: number = 0;
    lines: number = 0;
    link: string = "";
    mins: number = 0;
    name: string = "";
}

export class FBGame extends Game implements FireBaseItem{
    $key: string = "";

}

