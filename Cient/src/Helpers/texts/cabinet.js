const eng_cabinet = {
    "header": "Cabinet",
    history:{
        "subHeader": "History",
        category: 'Category',
        amount: 'Amount',
        movement: 'Balance',
        date: 'Date',
        comment: 'Comment'
    },
    edit:{
        "subHeader": "New record",
        button:'Add',
        history: {
            leftInfo: 'Recently added rows',
            subtitle: 'Add new money movement',
            button: 'Add money movement',
            purse: 'Purse',
            category: 'Category',
            amount: 'Amount',
            comment: 'Comment'
        },
        category: {
            leftInfo: 'Your categories',
            subtitle: 'Add new category',
            button: 'Add category',
            category: 'Category',
            universal: 'Universal categories',
            default: 'Universal category'
        },
        purse: {
            leftInfo: 'Your purses',
            subtitle: 'Add new purse',
            button: 'Add purse',
            purse: 'Purse name',
            amount: 'Initial amount'
        },
        people: {
            leftInfo: 'Joint management',
            subtitle: 'Add people to manage your purses',
            buttons: 'Add people',
            user: 'User login'
        }
    },
    aims:{
        "subHeader": "Your aims"
    },
    statistic:{
        "subHeader": "Statistic"
    },
    links: {
        "cabinet/history": "History",
        "cabinet/edit": "Add record",
        "cabinet/aims": "Aims",
        "cabinet/statistic": "Statistic"
    },
};
export const rus_cabinet = {
    "header": "Кабинет",
    history:{
        "subHeader": "История",
        category: 'Категория',
        amount: 'Сумма',
        movement: 'Баланс',
        date: 'Дата',
        comment: 'Комментарий'
    },
    edit:{
        "subHeader": "Создание новой записи",
        button: 'Добавить',
        history: {
            leftInfo: 'Недавно добавленные',
            subtitle: 'Добавление доходов и расходов',
            button: 'Добавить доходы и расходы',
            purse: 'Кошелек',
            category: 'Категория',
            amount: 'Сумма',
            comment: 'Комментарий'
        },
        category: {
            leftInfo: 'Ваши категории',
            subtitle: 'Добавление новой категории',
            button: 'Добавить категорию',
            category: 'Название категории',
            universal: 'Универсальные категории',
            default: 'Универсальная категория'
        },
        purse: {
            leftInfo: 'Ваши кошельки',
            subtitle: 'Добавление нового кошелька',
            button: 'Добавить кошелек',
            purse: 'Название кошелька',
            amount: 'Начальная сумма'
        },
        people: {
            leftInfo: 'Совместное управление',
            subtitle: 'Добавление пользователя для совместного управления',
            button: 'Добавить пользователя',
            user: 'Имя пользователя'
        },
    },
    aims:{
        "subHeader": "Цели"
    },
    statistic:{
        "subHeader": "Статистика"
    },
    links: {
        "cabinet/history": "История",
        "cabinet/edit": "Добавить",
        "cabinet/aims": "Цели",
        "cabinet/statistic": "Статистика"
    },
};

export default eng_cabinet;
