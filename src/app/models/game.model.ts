import { FireBaseItem, Item } from "./route.model";

export class Game extends Item{
}

export class FBGame extends Game implements FireBaseItem{
    $key: string = "";

}

