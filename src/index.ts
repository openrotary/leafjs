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
    moveNode(mid: string, n: number, data: any): object[] {
        // 移动元素
        if (mid === data._mid) {
            this.emit('error', '你为什么要移动自己？')
            return this.elementList
        }
        const [node]: any[] = this.elementList.filter((item: any) => item._mid === mid)
        const cacheIndex = node._index
        console.log(`相对元素是${cacheIndex}`)
        // 先处理受影响的部分
        if (n === 1) {
            // 在相对元素上方追加
            // 区分同级移动还是跨树移动
            if (node._pid === data._pid) {
                // 兄弟元素之间移动
                // 判断前移还是后移，区别处理
                if (data._index > cacheIndex) {
                    // 前移
                    this.elementList.forEach((item: any) => {
                        if (item._mid === data._mid) {
                            item._index = cacheIndex
                        }
                        if (
                            item._pid === data._pid &&
                            item._mid !== data._mid &&
                            item._index >= cacheIndex &&
                            item._index < data._index
                        ) {
                            item._index++
                        }
                    })
                } else {
                    // 后移
                    this.elementList.forEach((item: any) => {
                        if (item._mid === data._mid) {
                            item._index = cacheIndex - 1
                        }
                        if (
                            item._pid === data._pid &&
                            item._mid !== data._mid &&
                            item._index < cacheIndex &&
                            item._index > data._index
                        ) {
                            item._index--
                        }
                    })
                }
            } else {
                // 跨树移动
                this.elementList.forEach((item: any) => {
                    // 找到兄弟元素，消除影响
                    if (item._pid === data._pid && item._mid !== data._mid && item._index > data._index) {
                        item._index--
                    }
                    // 插入新元素
                    if (item._mid === data._mid) {
                        item._index = cacheIndex
                        item._pid = node._pid
                    }
                })
                this.elementList.forEach((item: any) => {
                    // 添加新位置的影响
                    if (item._pid === node._pid && item._mid !== data._mid && item._index >= cacheIndex) {
                        item._index++
                    }
                })
            }
        }
        if (n === 2) {
            if (node.isSingle) {
                this.emit('error', '不允许在单标签后添加元素')
                return this.elementList
            }
            if (mid === data._pid) {
                this.emit('error', `${data.tagName}已经是该元素的子元素`)
                return this.elementList
            }
            const index = this.elementList.filter((item: any) => item._pid === mid).length
            if (!data._pid) {
                // 将根元素移动到某元素后面
                this.elementList.forEach((item: any) => {
                    if (!item._pid && item._index > data._index) {
                        item._index--
                    }
                    if (item._mid === data._mid) {
                        item._pid = mid
                        item._index = index
                    }
                })
            } else {
                // 将普通元素移动到某元素后面
                this.elementList.forEach((item: any) => {
                    if (item._pid === data._pid && item._index > data._index) {
                        item._index--
                    }
                    if (item._mid === data._mid) {
                        item._pid = mid
                        item._index = index
                    }
                })
            }
        }
        if (n === 3) {
            // 在相对元素下方追加
            // 区分同级移动还是跨树移动
            if (node._pid === data._pid) {
                // 兄弟元素之间移动
                // 判断前移还是后移，区别处理
                if (data._index > cacheIndex) {
                    // 前移
                    this.elementList.forEach((item: any) => {
                        if (item._mid === data._mid) {
                            item._index = cacheIndex + 1
                        }
                        if (
                            item._pid === data._pid &&
                            item._mid !== data._mid &&
                            item._index > cacheIndex &&
                            item._index < data._index
                        ) {
                            item._index++
                        }
                    })
                } else {
                    // 后移
                    this.elementList.forEach((item: any) => {
                        if (item._mid === data._mid) {
                            item._index = cacheIndex
                        }
                        if (
                            item._pid === data._pid &&
                            item._mid !== data._mid &&
                            item._index <= cacheIndex &&
                            item._index > data._index
                        ) {
                            item._index--
                        }
                    })
                }
            } else {
                // 跨树移动
                this.elementList.forEach((item: any) => {
                    // 找到兄弟元素，消除影响
                    if (item._pid === data._pid && item._mid !== data._mid && item._index > data._index) {
                        item._index--
                    }
                    // 插入新元素
                    if (item._mid === data._mid) {
                        item._index = cacheIndex + 1
                        item._pid = node._pid
                    }
                })
                this.elementList.forEach((item: any) => {
                    // 添加新位置的影响
                    if (item._pid === node._pid && item._mid !== data._mid && item._index > cacheIndex) {
                        item._index++
                    }
                })
            }
        }
        return this.elementList.map(({ children, ...item }: any) => item)
    }
    deleteNode(mid: string): object[] {
        const [node]: any[] = this.elementList.filter((item: any) => item._mid === mid)
        const arr = this.elementList.filter((item: any) => item._mid !== mid)
        const childrenN = arr.filter((item: any) => item._pid === node._mid).length
        if (!node._pid) {
            // 优先处理根元素
            this.elementList = arr.map(({ _pid, _index, ...item }: any) => {
                if (_pid && _pid === node._mid) {
                    // 处理子元素
                    return {
                        _index: _index + node._index,
                        _pid: null,
                        ...item
                    }
                }
                if (!_pid && _index > node._index) {
                    // 处理兄元素
                    return {
                        _index: _index + childrenN - 1,
                        _pid: null,
                        ...item
                    }
                }
                // 处理无关元素
                return {
                    _index,
                    _pid,
                    ...item
                }
            })
        } else {
            this.elementList = arr.map(({ _pid, _index, ...item }: any) => {
                if (_pid && _pid === node._mid) {
                    // 处理子元素
                    return {
                        _index: _index + node._index,
                        _pid: node._pid,
                        ...item
                    }
                }
                if (_pid && _pid === node._pid && _index > node._index) {
                    // 处理兄元素
                    return {
                        _index: _index + childrenN - 1,
                        _pid,
                        ...item
                    }
                }
                // 处理无关元素
                return {
                    _index,
                    _pid,
                    ...item
                }
            })
        }
        // console.log(this.elementList)
        return this.elementList.map(({ children, ...item }: any) => item)
    }
    appendRootNode(_data: any, fb?: any): object[] {
        // n: number = 3
        // 默认向下添加
        const _index = this.elementList.filter((item: any) => !item._pid).length
        const data = fb ? fb(_data) : _data
        if (data._pid === null) {
            // 改变了根元素的顺序
            this.elementList.forEach((item: any) => {
                if (!item._pid && item._mid !== data._mid && item._index > data._index) {
                    item._index--
                }
                if (item._mid === data._mid) {
                    item._index = _index - 1
                }
            })
            this.emit('success', '你移动了一个根元素')
            return this.elementList.map(({ children, ...item }: any) => item)
        }
        if (data._mid) {
            // 将普通元素升级为根元素
            this.elementList.forEach((item: any) => {
                if (item._pid === data._pid && item._mid !== data._mid && item._index > data._index) {
                    item._index--
                }
                if (item._mid === data._mid) {
                    item._pid = null
                    item._index = _index
                }
            })
            this.emit('success', `你将${data.tagName}升级为根元素`)
            return this.elementList.map(({ children, ...item }: any) => item)
        }
        this.elementList.push({
            _pid: null,
            _mid: data._mid || getRandom(),
            _index,
            ...data
        })
        this.emit('success', '你添加了一个新的根元素')
        return this.elementList.map(({ children, ...item }: any) => item)
    }
    appendNode(mid: string, n: number, data: any): object[] {
        // 执行 before 钩子函数
        // log(data, '新元素')
        if (data._mid) {
            // 处理移动元素的操作
            return this.moveNode(mid, n, data)
        }
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
            } else {
                // 查看有多少兄弟元素
                this.elementList.forEach((item: any) => {
                    if (item._pid && item._pid === node._pid && item._index >= node._index) {
                        // console.log(item._index)
                        item._index++
                    }
                })
            }
            this.elementList.push({
                ...data,
                _pid: node._pid || null,
                _index: node._index - 1,
                _mid: data._mid || getRandom()
            })
        }
        if (n === 2) {
            // 在相对元素后追加
            // 先判断是否是单标签
            if (node.isSingle) {
                this.emit('error', '不允许在单标签后添加元素')
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
            } else {
                // 查看有多少兄弟元素
                this.elementList.forEach((item: any) => {
                    if (item._pid && item._pid === node._pid && item._index >= node._index + 1) {
                        item._index++
                    }
                })
            }
            this.elementList.push({
                ...data,
                _pid: node._pid || null,
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
