import { Item } from "./item.model";

export class Route extends Item {
    game: string = "";
}
export interface FireBaseItem{
    $key: string;
}

export class FBRoute extends Route implements FireBaseItem{
    $key: string = "";
}