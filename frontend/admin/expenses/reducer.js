const expenseModel = {
  'docType': 'EXPENSE',
  'code': '',
  'created': '',
  'updated': '',
  'category': '',
  'date': new Date(),
  'document': '',
  'amount': '',
  'detail': ''
}

const expenseCategoryModel = {
  'docType': 'EXPENSE_CATEGORY',
  'code': '',
  'created': '',
  'updated': '',
  'type': '',
  'name': '',
  'supplier': ''
}

const stateConst = {
  expenses: {},
  expenseCategories: {},
  expenseActive: expenseModel,
  expenseCategoryActive: expenseCategoryModel
}

export default function reducer(state = stateConst, action) {

  switch (action.type) {

    case 'FETCH_EXPENSES_FULFILLED':
    {
      return {
        ...state,
        expenses: action.payload
      }

    } // case

    case 'FETCH_EXPENSES_REJECTED':
    {
      return {
        ...state,
        expenses: {},
        expenseActive: expenseModel
      }
    } // case

    case 'SET_EXPENSE':
    {
      return {
        ...state,
        expenseActive: action.payload
      }
    }

    case 'CLEAR_EXPENSE':
    {
      return {
        ...state,
        expenseActive: expenseModel
      }
    }

    case 'FETCH_EXPENSE_CATEGORIES_FULFILLED':
    {
      return {
        ...state,
        expenseCategories: action.payload
      }

    } // case

    case 'FETCH_EXPENSE_CATEGORIES_REJECTED':
    {
      return {
        ...state,
        expenseCategories: {},
        expenseCategoryActive: expenseCategoryModel
      }
    } // case

    case 'SET_EXPENSE_CATEGORY':
    {
      return {
        ...state,
        expenseCategoryActive: action.payload
      }
    }

    case 'CLEAR_EXPENSE_CATEGORY':
    {
      return {
        ...state,
        expenseCategoryActive: expenseModel
      }
    }

  } // switch

  return state // default return

} // reducer
