export function calculateDday(deadline) {
    const deadlineDay = new Date(deadline)
    const today = new Date()
    const diff = deadlineDay - today

    const diffDay = Math.floor(diff / (1000*60*60*24))
    if (diffDay < 0) return '마감'
    else if (diffDay < 1) return 'D-day'
    else return 'd-' + diffDay
}

export const validDeadline = (deadline) => {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    const today = year + '-' + month + '-' + day
    return deadline > today
}