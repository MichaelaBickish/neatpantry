class ShoppingListItemsService {
  async checkAll(items) {
    document.querySelectorAll('input[type="checkbox"]')
  }
}

export const shoppingListItemsService = new ShoppingListItemsService()
