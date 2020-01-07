import { getRandom } from './utils'

export default class Leaf {
    elementList: object[] = []
    constructor(data) {
        if (!data || !data.length) {
            this.elementList = []
        }
    }
    appendNode(_data: any, fb?: any): object[] {
        if (!Array.isArray(_data)) {
            // 对象
            _data._mid = getRandom()
        }
        // 执行 before 钩子函数
        const data = fb ? fb(_data) : _data
        this.elementList.push(data)
        return this.elementList
    }
    static data2tree(data: any[]) {
        // 二维数组转树形结构
        // 没有pid的是第一层元素
        if (!data) {
            return []
        }
        // 第一步，筛选出根元素并排序
        const _arr = data.filter(item => !item._pid).sort((a, b) => a._index - b._index)
        // 第二步，使用递归方法筛选和排列子元素
        function array2Tree(arr, pid) {
            var arrCopy = arr.slice() // 浅拷贝
            var res = []
            for (var i = arr.length - 1; i >= 0; i--) {
                var item = arr[i]
                if (item._pid == pid) {
                    arrCopy.splice(i, 1)
                    res.unshift(item)
                }
            }
            for (var j = 0, max = res.length; j < max; j++) {
                var item = res[j]
                item.children = array2Tree(arrCopy, item._mid)
            }
            return res
        }
        return _arr.map(({ _mid, ...item }) => ({
            ...item,
            _mid,
            children: array2Tree(data, _mid)
        }))
    }
}
