interface Ingredient {
    water: number;
    milk?: number;
    coffee: number;
  }
  
  interface Drink {
    ingredients: Ingredient;
    cost: number;
  }
  
  const MENU: { [name: string]: Drink } = {
    espresso: {
      ingredients: {
        water: 50,
        coffee: 18,
      },
      cost: 1.5,
    },
    latte: {
      ingredients: {
        water: 200,
        milk: 150,
        coffee: 24,
      },
      cost: 2.5,
    },
    cappuccino: {
      ingredients: {
        water: 250,
        milk: 100,
        coffee: 24,
      },
      cost: 3.0,
    },
  };
  
  let profit = 0;
  const resources: Ingredient = {
    water: 300,
    milk: 200,
    coffee: 100,
  };
  
  function isResourceSufficient(orderIngredients: Ingredient): boolean {
    for (const item in orderIngredients) {
        if (item !== undefined && item !== null && orderIngredients[item] >= resources[item]) {
          console.log(`Es tut uns leid, es ist nicht genügend ${item} vorhanden.`);
          return false;
        }
      }
    return true;
  }
  
  function processCoins(): number {
    console.log("Bitte Münzen einwerfen:");
    const quarters = parseInt(prompt("Wie viele Vierteldollar?: ") || "0");
    const dimes = parseInt(prompt("Wie viele Zehncentstücke?: ") || "0");
    const nickles = parseInt(prompt("Wie viele Fünfcentstücke?: ") || "0");
    const pennies = parseInt(prompt("Wie viele Centstücke?: ") || "0");
  
    const total = quarters * 0.25 + dimes * 0.1 + nickles * 0.05 + pennies * 0.01;
    return total;
  }
  
  function isTransactionSuccessful(moneyReceived: number, drinkCost: number): boolean {
    if (moneyReceived >= drinkCost) {
      const change = parseFloat((moneyReceived - drinkCost).toFixed(2));
      console.log(`Hier ist dein Wechselgeld von $${change}.`);
      profit += drinkCost;
      return true;
    } else {
      console.log("Es tut uns leid, das reicht nicht aus. Das Geld wird zurückgegeben.");
      return false;
    }
  }
  
  function makeCoffee(drinkName: string, orderIngredients: Ingredient): void {
    for (const item in orderIngredients) {
      resources[item] -= orderIngredients[item];
    }
    console.log(`Hier ist dein ${drinkName}.`);
  }
  let isOn = true;
  while (isOn) {
    const choice = prompt("Was möchtest du bestellen? (espresso/latte/cappuccino):");
    if (choice === null) {
      isOn = false;
    } else if (choice === "aus") {
      isOn = false;
    } else if (choice === "bericht") {
      console.log(`Wasser: ${resources.water}ml`);
      console.log(`Milch: ${resources.milk}ml`);
      console.log(`Kaffee: ${resources.coffee}g`);
      console.log(`Einnahmen: $${profit}`);
    } else {
      const drink = MENU[choice];
      if (drink && isResourceSufficient(drink.ingredients)) {
        const payment = processCoins();
        if (isTransactionSuccessful(payment, drink.cost)) {
          makeCoffee(choice, drink.ingredients);
        }
      }
    }
  }
