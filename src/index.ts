import { getRandom, log } from './utils'

export default class Leaf {
    elementList: object[] = []
    bus: any
    constructor(data) {
        this.bus = {}
        if (!data || !data.length) {
            this.elementList = []
        }
    }
    on(name: string, cb: any) {
        if (!this.bus[name]) {
            this.bus[name] = []
        }
        this.bus[name].push(cb)
    }
    emit(name: string, ...params: any) {
        if (!this.bus[name]) {
            this.bus[name] = []
        }
        this.bus[name].forEach(cb => {
            cb(...params)
        })
    }
    deleteNode(mid: string): object[] {
        const [node]: any[] = this.elementList.filter((item: any) => item._mid === mid)
        const arr = this.elementList.filter((item: any) => item._mid !== mid)
        console.log(arr)
        this.elementList = arr.map(({ _pid, ...item }: any) => {
            console.log(_pid)
            if (_pid && _pid === node._mid) {
                console.log('元素', item)
                return {
                    _pid: node._pid,
                    ...item
                }
            }
            if (!_pid) {
                console.log('根元素')
                return { ...item }
            }
            return {
                _pid,
                ...item
            }
        })
        console.log(this.elementList)
        return this.elementList.map(({ children, ...item }: any) => item)
    }
    appendRootNode(_data: any, fb?: any): object[] {
        // n: number = 3
        // 默认向下添加
        const data = fb ? fb(_data) : _data
        const _index = this.elementList.filter((item: any) => !item._pid).length
        this.elementList.push({
            _mid: _data._mid || getRandom(),
            _index,
            ...data
        })
        this.emit('success', '添加成功')
        return this.elementList.map(({ children, ...item }: any) => item)
    }
    appendNode(mid: string, n: number, data: any): object[] {
        // 执行 before 钩子函数
        // log(data, '新元素')
        const [node]: any[] = this.elementList.filter((item: any) => item._mid === mid)
        if (n === 1) {
            // 在相对元素上方追加
            if (!node._pid) {
                // 优先处理根元素
                this.elementList.forEach((item: any) => {
                    if (!item._pid && item._index >= node._index) {
                        console.log(item._index)
                        item._index++
                    }
                })
                this.elementList.push({
                    ...data,
                    _index: node._index - 1,
                    _mid: data._mid || getRandom()
                })
                return this.elementList.map(({ children, ...item }: any) => item)
            }
            // 查看有多少兄弟元素
            this.elementList.forEach((item: any) => {
                if (item._pid && item._pid === node._pid && item._index >= node._index) {
                    // console.log(item._index)
                    item._index++
                }
            })
            this.elementList.push({
                ...data,
                _pid: node._pid,
                _index: node._index - 1,
                _mid: data._mid || getRandom()
            })
        }
        if (n === 2) {
            // 在相对元素后追加
            // 先判断是否是单标签
            if (node.isSingle) {
                this.emit('warn', '不允许在单标签后添加元素')
                return this.elementList
            }
            const _index = this.elementList.filter((item: any) => item._pid === mid).length
            this.elementList.push({
                ...data,
                _pid: mid,
                _index,
                _mid: data._mid || getRandom()
            })
        }
        if (n === 3) {
            // 在相对元素下方追加
            if (!node._pid) {
                // 优先处理根元素
                this.elementList.forEach((item: any) => {
                    if (!item._pid && item._index >= node._index + 1) {
                        item._index++
                    }
                })
                this.elementList.push({
                    ...data,
                    _index: node._index + 1,
                    _mid: data._mid || getRandom()
                })
                return this.elementList.map(({ children, ...item }: any) => item)
            }
            // 查看有多少兄弟元素
            this.elementList.forEach((item: any) => {
                if (item._pid && item._pid === node._pid && item._index >= node._index + 1) {
                    item._index++
                }
            })
            this.elementList.push({
                ...data,
                _pid: node._pid,
                _index: node._index + 1,
                _mid: data._mid || getRandom()
            })
        }
        this.emit('success', '添加成功')
        return this.elementList.map(({ children, ...item }: any) => item)
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
                item.children = array2Tree(arrCopy, item._mid).sort((a, b) => a._index - b._index)
            }
            return res
        }
        return _arr.map(({ _mid, ...item }) => ({
            ...item,
            _mid,
            children: array2Tree(data, _mid).sort((a, b) => a._index - b._index)
        }))
    }
}
