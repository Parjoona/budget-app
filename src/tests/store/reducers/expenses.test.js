import expensesReducer from '../../../store/reducers/expenses'
import expenses from '../fixtures/expenses'

test('Should set default state', () => {
    const state = expensesReducer(undefined, {
        type: '@@INIT'
    })

    expect(state).toEqual([])
})

test('Should remove a expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }

    const state = expensesReducer(expenses, action)
    expect(state).toEqual([
        expenses[0],
        expenses[2],
        expenses[3]
    ])
})

test('Should NOT remove a expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: 'NoId'
    }

    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})

test('Should add expense', () => {
    const expense = {
        id: '111',
        note: '',
        description: 'New',
        createdAt: 0,
        amount: 100
    }

    const action = {
        type: 'ADD_EXPENSE',
        expense
    }

    const state = expensesReducer(expenses, action)
    expect(state).toEqual([...expenses, expense])
})

test('Should edit expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            amount: 1230
        }
    }

    const state = expensesReducer(expenses, action)
    expect(state[1].amount).toBe(1230)
})

test('Should edit expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: 1133,
        updated: {
            amount: 1230
        }
    }

    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses)
})


test('Should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [
            expenses[1]
        ]
    }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([expenses[1]])
})