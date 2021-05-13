class ShoppingListItemsService {
  async toggleCheck(items) {
    document.getElementById('check-all-box').checked ? document.getElementById('check-one-box').checked = true : document.getElementById('check-one-box').checked = false
    // $('#check-all-box').click(function() {
    //   $('input[type=checkbox]').prop('checked', $(this).prop('checked'))
    // })
  }
}

export const shoppingListItemsService = new ShoppingListItemsService()
