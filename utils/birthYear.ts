function birthYear (value?: string) {
    let result = value
    result = result?.replace('BBY', ' years Before the Battle of Yavin')
    result = result?.replace('ABY', ' years After the Battle of Yavin')

    return result
}

export default birthYear
