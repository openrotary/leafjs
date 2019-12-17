import { getRandom } from './utils'

export default class Leaf {
    treeData: object[] = []
    constructor(data) {
        if (!data || !data.length) {
            this.treeData = []
        }
    }
    appendNode(data: any[]): object[] {
        if (data.length === 1 && !data[0]._mid) {
            data[0]._mid = getRandom()
        }
        if (!this.treeData.length) {
            this.treeData = data
            return this.treeData
        }
    }
}
