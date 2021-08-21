import { FireBaseItem } from "./route.model";

export class Item {
    chars: number = 0;
    days: number = 0;
    lines: number = 0;
    link: string = "";
    mins: number = 0;
    name: string = "";
}

export class FBItem extends Item implements FireBaseItem{
    $key: string = "";
}