import { data } from "../data/temporaryData"

class TemporaryStorage {
  constructor() {
    this.data = data
  }
  
  read() {
    return this.data
  }

  write(data) {
    this.data = data
  }
}

export default TemporaryStorage