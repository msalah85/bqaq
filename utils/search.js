export default function search(str, elements = [], key) {
    return new Promise((resolve, reject) => {



        let results = [];
        let query = str?.trim().toLowerCase()
        elements.forEach(item => {
            // looping at each item after concatenating post title and body then match search query with this string

            let term = (item.[key])?.trim().toLowerCase();

            let matchingResult = term?.match(query)

            if (query?.trim() && matchingResult && matchingResult.length > 0) {
                let result = { ...item };
                results.push(result)
            }

        })

        resolve(results);

    })
}