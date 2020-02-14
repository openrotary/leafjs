const Leaf = require("../dist/bundle.cjs.js");
const stylusFormat = require("stylus-supremacy");

const data = [
  {
    _index: 0,
    _pid: null,
    class: ["xxgft"],
    attr: [],
    css: [
      {
        _mid: "ck6lzwx5b00003w5sjggxx6ft",
        _pid: null,
        _index: 0,
        isSingle: false,
        select: ".xxgft",
        cssom: {
          width: "100vw",
          display: "flex",
          "flex-direction": "column"
        }
      }
    ],
    _mid: "ck6lzwx5b00003w5sjggxx6ft",
    tagName: "section",
    isSingle: false
  },
  {
    _index: 0,
    _pid: "ck6lzwx5b00003w5sjggxx6ft",
    class: [],
    attr: [
      {
        title: "房屋验收"
      }
    ],
    css: [],
    _mid: "ck6m0s61s00003w5sri1m33mh",
    tagName: "SHeader",
    isSingle: false,
    children: [
      {
        _index: 0,
        _pid: "ck6m0s61s00003w5sri1m33mh",
        class: ["xoyfz"],
        attr: [],
        css: [
          {
            _mid: "ck6magt1g00003w5spcdxoy5z",
            _pid: null,
            _index: 0,
            isSingle: false,
            select: ".xoyfz",
            cssom: {
              display: "flex",
              "align-items": "center",
              "justify-content": "center",
              "font-size": "15px",
              color: "#fff",
              "background-color": "#AE9575"
            }
          }
        ],
        _mid: "ck6magt1g00003w5spcdxoy5z",
        tagName: "span",
        isSingle: false,
        content: "筛选",
        children: []
      }
    ]
  },
  {
    _index: 1,
    _pid: "ck6lzwx5b00003w5sjggxx6ft",
    class: ["jcche"],
    attr: [
      {
        ":key": "$_i"
      },
      {
        "v-for": "($it, $_i) in dataList"
      }
    ],
    css: [
      {
        _mid: "ck6m15nts00043w5shh6j2ch4",
        _pid: null,
        _index: 0,
        isSingle: false,
        select: ".jcche",
        cssom: {
          "list-style": "none",
          "font-style": "normal",
          "box-sizing": "border-box",
          padding: "0 15px",
          width: "100%",
          display: "flex",
          "flex-direction": "column",
          background: "#fff",
          "margin-bottom": "10px"
        }
      }
    ],
    _mid: "ck6m15nts00043w5shh6j2ch4",
    tagName: "li",
    isSingle: false,
    children: [
      {
        _index: 0,
        _pid: "ck6m15nts00043w5shh6j2ch4",
        class: ["zrqyd"],
        attr: [],
        css: [
          {
            _mid: "ck6m85qdn00043w5snl8zrqy3",
            _pid: null,
            _index: 0,
            isSingle: false,
            select: ".zrqyd",
            cssom: {
              color: "#424242",
              "font-size": "15px",
              display: "-webkit-box",
              "-webkit-line-clamp": "2",
              "-webkit-box-orient": "vertical",
              overflow: "hidden"
            }
          }
        ],
        _mid: "ck6m85qdn00043w5snl8zrqy3",
        tagName: "span",
        isSingle: false,
        content: "{{ $it.title }}",
        children: []
      },
      {
        _index: 1,
        _pid: "ck6m15nts00043w5shh6j2ch4",
        class: ["ahcgd"],
        attr: [],
        css: [
          {
            _mid: "ck6m85xo700073w5s256a7c6d",
            _pid: null,
            _index: 0,
            isSingle: false,
            select: ".ahcgd",
            cssom: {
              "font-size": "12px",
              color: "#757575",
              display: "flex",
              "align-items": "center",
              "justify-content": "center",
              "flex-shrink": 0,
              "background-color": "#F5F5F5",
              "border-radius": "5px",
              padding: "3px 5px"
            }
          }
        ],
        _mid: "ck6m85xo700073w5s256a7c6d",
        tagName: "span",
        isSingle: false,
        content: "{{ $it.status }}",
        children: []
      }
    ]
  },
  {
    _index: 0,
    _pid: "ck6m15nts00043w5shh6j2ch4",
    class: ["zrqyd"],
    attr: [],
    css: [
      {
        _mid: "ck6m85qdn00043w5snl8zrqy3",
        _pid: null,
        _index: 0,
        isSingle: false,
        select: ".zrqyd",
        cssom: {
          color: "#424242",
          "font-size": "15px",
          display: "-webkit-box",
          "-webkit-line-clamp": "2",
          "-webkit-box-orient": "vertical",
          overflow: "hidden"
        }
      }
    ],
    _mid: "ck6m85qdn00043w5snl8zrqy3",
    tagName: "span",
    isSingle: false,
    content: "{{ $it.title }}",
    children: []
  },
  {
    _index: 1,
    _pid: "ck6m15nts00043w5shh6j2ch4",
    class: ["ahcgd"],
    attr: [],
    css: [
      {
        _mid: "ck6m85xo700073w5s256a7c6d",
        _pid: null,
        _index: 0,
        isSingle: false,
        select: ".ahcgd",
        cssom: {
          "font-size": "12px",
          color: "#757575",
          display: "flex",
          "align-items": "center",
          "justify-content": "center",
          "flex-shrink": 0,
          "background-color": "#F5F5F5",
          "border-radius": "5px",
          padding: "3px 5px"
        }
      }
    ],
    _mid: "ck6m85xo700073w5s256a7c6d",
    tagName: "span",
    isSingle: false,
    content: "{{ $it.status }}",
    children: []
  },
  {
    _index: 0,
    _pid: "ck6m0s61s00003w5sri1m33mh",
    class: ["xoyfz"],
    attr: [],
    css: [
      {
        _mid: "ck6magt1g00003w5spcdxoy5z",
        _pid: null,
        _index: 0,
        isSingle: false,
        select: ".xoyfz",
        cssom: {
          display: "flex",
          "align-items": "center",
          "justify-content": "center",
          "font-size": "15px",
          color: "#fff",
          "background-color": "#AE9575"
        }
      }
    ],
    _mid: "ck6magt1g00003w5spcdxoy5z",
    tagName: "span",
    isSingle: false,
    content: "筛选",
    children: []
  }
];

const res = Leaf.tree2CSS(Leaf.data2tree(data));
console.log(
  stylusFormat.format(res, {
    insertColons: true,
    insertSemicolons: true,
    insertBraces: true
  })
);
