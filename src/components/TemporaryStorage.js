class TemporaryStorage {

  constructor(temporaryData) {
    this.data = temporaryData
  }
  
  read() {
    return this.data
  }

  write(data) {
    this.data = data
  }
}

export default TemporaryStorage