import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { startEditExpense, startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses, startRemoveExpense } from '../../../store/actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../../firebase/firebase'

const createMockStore = configureMockStore([thunk])
const uid = 'thisisjibberish'
const defaultAuthState = { auth: { uid }}

beforeEach((done) => {
    const expensesData = {}
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt}
    })
    database.ref(`users/${uid}/expenses`)
        .set(expensesData)
        .then(() => done())
})

test('Should setup remove expense:action:object', () => {
    const action = removeExpense({ id: 'abcde' })
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'abcde'
    })
})

test('Should remove expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState)
    const id = expenses[2].id

    store
        .dispatch(startRemoveExpense({ id }))
        .then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual({
                type: 'REMOVE_EXPENSE',
                id
            })

            return database
                .ref(`users/${uid}/expenses/${id}`)
                .once('value')
                .then(snapshot => {
                    expect(snapshot.val()).toBeFalsy()
                    done()
            })
        })
})

test('Should setup edit expense:action', () => {
    const action = editExpense('abcde', { note: 'Updated' })
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'abcde',
        updates: {
            note: 'Updated'
        }
    })
})

test('Should edit expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState)
    const id = expenses[1].id
    const updates = { amount: 200000 }

    store
        .dispatch(startEditExpense(id, updates))
        .then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual({
                type: 'EDIT_EXPENSE',
                id,
                updates
            })
            return database
                .ref(`users/${uid}/expenses/${id}`)
                .once('value')
        }).then((snapshot) => {
            expect(snapshot.val().amount).toBe(updates.amount)
            done()
        })
})

test('Should setup add expense:action with provided values', () => {
    const action = addExpense(expenses[2])
    
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
})

test('Should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState)
    const expenseData = {
        description: 'Data',
        amount: 3000000,
        note: 'Facebook',
        createdAt: 100000
    }

    store
        .dispatch(startAddExpense(expenseData))
        .then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            })

    return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once('value')
    }).then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData)
        done()
    })
})

test('Should add expense to database and store with defaults', (done) => {
    const store = createMockStore(defaultAuthState)
    const expenseData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    }

    store
        .dispatch(startAddExpense({}))
        .then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            })

    return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once('value')
    }).then(snapshot => {
        expect(snapshot.val()).toEqual(expenseData)
        done()
    })
})

test('Should setup set expenses action object with data', () => {
    const action = setExpenses(expenses)
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})

test('Should fetch expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState)
    store.dispatch(startSetExpenses())
        .then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual({
                type: 'SET_EXPENSES',
                expenses
            })
            done()
        })
})

// test('Should setup add expense:action with default values', () => {
//     const action = addExpense()
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             note: '',
//             amount: 0,
//             createdAt: 0,
//             description: '',
//             id: expect.any(String)
//         }
//     })
// })



