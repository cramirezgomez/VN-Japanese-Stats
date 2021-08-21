import { Item } from "./item.model";
import { FireBaseItem } from "./route.model";

export class Game extends Item{
}

export class FBGame extends Game implements FireBaseItem{
    $key: string = "";

}

