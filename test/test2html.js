const Leaf = require("../dist/bundle.cjs.js");
const prettier = require("prettier");

const data = [
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
    tagName: "li",
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
        tagName: "li",
        isSingle: false,
        content: "筛选",
        children: []
      }
    ]
  }
];

const htmlCode = Leaf.tree2DOM(data);
const formatConfig = { semi: false, tabWidth: 4, parser: "vue" };
try {
  prettier.format(
    `<template>
    <li title="房屋验收">
        <li :class="['xoyfz']">筛选</li>
    </li>
</template>`,
    formatConfig
  );
} catch (err) {
  console.log(err);
  return;
}
