/* Models for RecipeMa 0.1.0 */

export class Recipe {
  public static className = "Recipe";

  public static create(obj: Recipe) {
    return new Recipe(
      obj.name,
      obj.ingredients,
      obj.directions,
      obj.id,
      obj.description,
      obj.pairings,
      obj.tags,
      obj.createdAt,
      obj.authorId,
      obj.servings,
      obj.prepTime,
      obj.cookTime,
      obj.cuisine,
    );
  }

  constructor(
      public name: string,
      public ingredients: Ingredient[],
      public directions: Direction[],
      public id?: string,
      public description?: string,
      public pairings?: string[],
      public tags?: string[],
      public createdAt?: string,
      public authorId?: string,
      public servings?: number,
      public prepTime?: string,
      public cookTime?: string,
      public cuisine?: string,
  ) {}
}

export class Ingredient {
  public static className = "Ingredient";

  public static create(obj: Ingredient) {
    return new Ingredient(
      obj.name,
      obj.amount,
    );
  }

  constructor(
      public name: string,
      public amount: Amount,
  ) {}
}

export class Direction {
  public static className = "Direction";

  public static create(obj: Direction) {
    return new Direction(
      obj.text,
    );
  }

  constructor(
      public text: string,
  ) {}
}

export class Amount {
  public static className = "Amount";

  public static create(obj: Amount) {
    return new Amount(
      obj.value,
      obj.unit,
    );
  }

  constructor(
      public value: number,
      public unit: Unit,
  ) {}
}

enum Unit {
  piece = "piece",
  gallon = "gallon",
  quart = "quart",
  pint = "pint",
  cup = "cup",
  ounce = "ounce",
  kilogram = "kilogram",
  gram = "gram",
  milligram = "milligram",
  teaspoon = "teaspoon",
  tablespoon = "tablespoon",
}

export class AccountForm {
  public static className = "AccountForm";

  public static create(obj: AccountForm) {
    return new AccountForm(
      obj.username,
      obj.password,
      obj.blob,
    );
  }

  constructor(
      public username: string,
      public password: string,
      public blob?: object,
  ) {}
}
