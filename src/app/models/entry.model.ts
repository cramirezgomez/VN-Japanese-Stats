import { FireBaseItem } from "./route.model";

export class Entry {
    chars: number = 0;
    date: string = "";
    lines: number = 0;
    mins: number = 0;
    route: string = "";
}

export class FBEntry extends Entry implements FireBaseItem{
    $key: string = "";

}
