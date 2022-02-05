// base - Product.find()

// bigQ - search=coder&page=2&category=shortsleeves&rating[gte]=4&price[lte]=999&price[gte]=199

//creating a class with constructor
class WhereClause {
  constructor(base, bigQ) {
    this.base = base;
    this.bigQ = bigQ;
  }

  //search method
  search() {
    const searchWord = this.bigQ.search
      ? {
          name: {
            $regex: this.bigQ.search,
            $options: "i",
          },
        }
      : {};

    //injecting product.base
    this.base = this.base.find({ ...searchWord });
    return this;
  }

  filter() {
    const copyQ = { ...this.bigQ };

    //removing some of the fields
    delete copyQ["search"];
    delete copyQ["limit"];
    delete copyQ["page"];

    //adding regex for adding $ to gte,lte and more
    //using JSON.stringify to convert JSON to stirng
    let stringOfCopyQ = JSON.stringify(copyQ); //converting into a string first

    stringOfCopyQ = stringOfCopyQ.replace(
      /\b(gte|lte|gt|lt)\b/g,
      (m) => `${m}`
    ); //regex for adding $ to the gte,lte,gt,lt

    //converting the new string to JSON
    const jsonOfCopyQ = JSON.parse(stringOfCopyQ);

    this.base = this.base.find(jsonOfCopyQ);
    return this;
  }

  //pagination
  pager(resultperPage) {
    let currentPage = 1;
    if (this.bigQ.page) {
      currentPage = this.bigQ.page;
    }

    const skipVal = resultperPage * (currentPage - 1);

    this.base = this.base.limit(resultperPage).skip(skipVal);
    return this;
  }
}

module.exports = WhereClause;
