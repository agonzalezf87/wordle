const randomEsWord = async (length) => {
    try {
        showAlert('inf', `Cargando...`, 2500)
        const res = await apiEs.get(API_ES_BYLENGTH, {
            params: {
                'length' : length,
            }
        })

        if(res.status === 200) {
            const {data} = await res
            const word = data.body.Word.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
            for(let i = 0; i < word.length; i++){
                gameArray.push(word.charAt(i))
            }
        }else {
            showAlert('error', `La cosulta devolvió el error ${res.status}`, 2500)
        }
    } catch (error) {
        console.log(error)
        showAlert('error', `${error.message}: ${error.response.statusText}`, 2500)
    }
}

const randomEnWord = async (length) => {
    try {
        const res = await apiEn.get(API_EN, {
            headers: {
                'hasDictionaryDef': true,
                'minLength': length,
                'maxLength': length,
            }
        })
    } catch (error) {
        console.log(error)
        showAlert('error', `${error.message}: ${error.response.data.body}`, 2500)
    }
}