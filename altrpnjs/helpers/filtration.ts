import LIKE from "./const/LIKE"

const filtration = (query, request, sColumns) => {
  const params = request.qs()

  if(params.order_by && params.order) {
    switch (params.order_by) {
      case "author":
        params.order_by = "user_id"
    }
    query.orderBy(params.order_by, params.order)
  }

  if (params.s) {
    let searches = params.s.split(' ')
    query = query.where(subQuery => {
      for (let s of searches) {
        if (!s.trim()) {
          continue
        }
        subQuery.where(subSubQuery => {

          sColumns.forEach((column) => {
            subSubQuery.orWhere(column, LIKE, `%${s}%`)
          })

          return subSubQuery
        })
      }
      return subQuery
    })
  }
}

export default filtration
