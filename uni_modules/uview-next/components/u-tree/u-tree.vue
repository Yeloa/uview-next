<template>
    <view class="u-tree">
        <view class="u-tree__nodes">
            <view
                v-for="(node, index) in visibleNodes"
                :key="index"
                class="u-tree__node-wrapper"
                :style="[nodeWrapperStyle(node)]"
            >
                <view
                    class="u-tree__switcher"
                    v-if="showSwitcher"
                    @tap.stop="onToggle(node)"
                >
                    <slot
                        name="switcher"
                        :hide="!(hasChildren(node) || (!!loadNode && !isLeaf(node)))"
                        :loading="isLoading(node)"
                        :expanded="isExpanded(node)"
                    >
                        <u-loading-icon
                            v-if="isLoading(node)"
                            mode="circle"
                            :color="loadingColor"
                            :size="12"
                        />
                        <u-icon
                            v-else-if="hasChildren(node) || (!!loadNode && !isLeaf(node))"
                            :name="isExpanded(node) ? collapseIcon : expandIcon"
                            :size="switcherSize"
                            :color="switcherColor"
                        />
                    </slot>
                </view>
				<u-checkbox
					v-if="checkable"
					:size="16"
					:checked="isChecked(node)"
					:indeterminate="isIndeterminate(node)"
					:activeColor="checkedColor"
					@change="handleCheck(node)"
				></u-checkbox>
                <view
                    class="u-tree__content"
                    :style="[contentStyle(node)]"
                    @tap.stop="onToggle(node)"
                >
                    <slot name="content" :node="node">
                        <text class="u-tree__label" :style="labelStyle(node)">
                            {{ node[labelField] }}
                        </text>
                    </slot>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import props from './props.js';
    import mixin from '../../libs/mixin/mixin';
    import mpMixin from '../../libs/mixin/mpMixin';

    /**
     * tree树形组件
     * @description 树形结构，支持选择、级联选择、异步加载、搜索过滤、插槽自定义。
     * @tutorial https://uview.d3u.cn/components/tree.html
	 * @property {Array} data 数据源
	 * @property {String} keyField 节点key
	 * @property {String} labelField 节点label
	 * @property {String} childrenField 子节点
	 * @property {String} isLeafField 是否叶子节点
	 * @property {String} disabledField 是否禁用
	 * @property {Array} defaultCheckedKeys 默认选中
	 * @property {Array} defaultExpandedKeys 默认展开
	 * @property {Array} checkedKeys 受控的选中项
	 * @property {Array} expandedKeys 受控的展开项
	 * @property {Boolean} checkable 是否可选择
	 * @property {Boolean} selectable 是否可选择
	 * @property {Boolean} cascade 是否级联
	 * @property {Boolean} expandOnClick 是否允许点击节点展开/收缩
	 * @property {Boolean} checkOnClick 是否允许点击节点勾选/取消勾选
	 * @property {Function} loadNode 异步加载节点数据
	 * @property {Boolean} allowCheckingNotLoaded 是否允许勾选未加载的节点
	 * @property {Boolean} showIrrelevantNodes 是否显示搜索无关的节点
	 * @property {Boolean} showSwitcher 是否显示展开/收缩按钮
	 * @property {String} expandIcon 展开图标
	 * @property {String} collapseIcon 收缩图标
	 * @property {String} loadingColor loading的颜色
	 * @property {String} checkedColor checkebox选中颜色
	 * @property {Boolean} rotatableSwitcher 是否可旋转展开/收缩按钮
	 * @property {String} highlightBgColor 高亮背景颜色
	 * @property {String} selectedBgColor 选中背景颜色
	 * @property {Number} switcherSize 展开/收缩按钮大小
	 * @property {String} switcherColor 展开/收缩按钮颜色
	 * @property {String} indentWidth 缩进宽度
	 * @property {String} pattern 搜索词
	 * @property {String} highlightBgColor 高亮背景颜色
	 * @property {String} selectedBgColor 选中背景颜色
	 * @property {Number} switcherSize 展开/收缩按钮大小
	 * @property {String} switcherColor 展开/收缩按钮颜色
	 * 
	 * @event {event} click 点击节点
	 * @event {event} checked 勾选节点
	 * @event {event} expanded 展开节点
	 * @event {event} update:checked-keys 更新选中项
	 * @event {event} update:expanded-keys 更新展开项
	 * 
	 * @slot {slot} switcher 展开/收缩按钮
	 * @slot {slot} content 节点内容
	 * 
	 * @example 
	 * <u-tree :data="data" @click="click" @checked="checked" @expanded="expanded" @update:checked-keys="updateCheckedKeys" @update:expanded-keys="updateExpandedKeys"></u-tree>
     */
    export default {
        name: 'u-tree',
        mixins: [mpMixin, mixin, props],
        data() {
            return {
                innerCheckedKeys: this.defaultCheckedKeys
                    ? [...this.defaultCheckedKeys]
                    : [],
                innerExpandedKeys: this.defaultExpandedKeys
                    ? [...this.defaultExpandedKeys]
                    : [],
                selectedKey: null,
                loadingMap: {},
            };
        },
        computed: {
            visibleNodes() {
                const result = [];
                const filter = (node) => {
                    if (!this.pattern) return true;
                    const label = node[this.labelField] + '';
                    return label
                        .toLowerCase()
                        .includes(this.pattern.toLowerCase());
                };
                const traverse = (nodes, level, parentMatched) => {
                    if (!nodes || nodes.length === 0) return;
                    for (const n of nodes) {
                        const matched = filter(n);
                        const shouldShow = this.showIrrelevantNodes
                            ? true
                            : matched ||
                              parentMatched ||
                              this.hasDescendantMatch(n);
                        if (shouldShow) {
                            result.push({
                                ...n,
                                __level: level,
                                __matched: matched,
                            });
                            if (this.isExpanded(n)) {
                                traverse(
                                    n[this.childrenField],
                                    level + 1,
                                    parentMatched || matched,
                                );
                            }
                        }
                    }
                };
                traverse(this.data, 0, false);
                return result;
            },
        },
        watch: {
            data: {
                handler() {
                    this.buildNodeIndex();
                },
                deep: true,
                immediate: true,
            },
            pattern: {
                handler() {
                    this.expandAncestorsForPattern();
                },
            },
        },
        // #ifdef VUE3
        emits: [
            'click',
            'checked',
            'expanded',
            'update:checked-keys',
            'update:expanded-keys',
        ],
        // #endif
        methods: {
            keyOf(node) {
                return node[this.keyField];
            },
            // 受控/非受控展开、勾选 keys 统一获取
            getEffectiveExpandedKeys() {
                return this.expandedKeys ? this.expandedKeys : this.innerExpandedKeys;
            },
            getEffectiveCheckedKeys() {
                return this.checkedKeys ? this.checkedKeys : this.innerCheckedKeys;
            },
            ensureNodeIndexesBuilt() {
                if (!this._nodeIndex || !this._parentIndex) this.buildNodeIndex();
            },
            // 通用索引构建器：从任意起点增量构建 key->node 与 key->parentKey
            indexNodes(startNodes, parentKey) {
                const stack = Array.isArray(startNodes)
                    ? startNodes.map((n) => ({ node: n, parentKey }))
                    : [];
                while (stack.length) {
                    const { node: current, parentKey: currentParentKey } = stack.pop();
                    if (!current) continue;
                    const currentNodeKey = this.keyOf(current);
                    if (currentNodeKey) {
                        this._nodeIndex[currentNodeKey] = current;
                        if (currentParentKey) this._parentIndex[currentNodeKey] = currentParentKey;
                    }
                    const children = current[this.childrenField];
                    if (Array.isArray(children) && children.length) {
                        for (let i = 0; i < children.length; i++) {
                            stack.push({ node: children[i], parentKey: currentNodeKey });
                        }
                    }
                }
            },
            buildNodeIndex() {
                this._nodeIndex = Object.create(null);
                this._parentIndex = Object.create(null);
                this.indexNodes(this.data, null);
            },
          
            indexSubtree(node) {
                if (!node) return;
                const children = node[this.childrenField];
                if (!Array.isArray(children) || children.length === 0) return;
                const parentKey = this.keyOf(node);
                this.indexNodes(children, parentKey);
            },
            // 根据搜索词，自动展开所有命中的子节点的祖先
            expandAncestorsForPattern() {
                const p = (this.pattern || '').toLowerCase();
                if (!p) {
                    if (this._preSearchExpandedKeys) {
                        this.setExpandedKeys(this._preSearchExpandedKeys);
                        this._preSearchExpandedKeys = null;
                    }
                    return;
                }
                this.ensureNodeIndexesBuilt();
                if (!this._preSearchExpandedKeys) {
                    const current = this.getEffectiveExpandedKeys();
                    this._preSearchExpandedKeys = Array.isArray(current) ? current.slice() : [];
                }
                const next = new Set(this._preSearchExpandedKeys || []);
                for (const nodeKey in this._nodeIndex) {
                    const nodeRef = this._nodeIndex[nodeKey];
                    const label = (nodeRef[this.labelField] + '').toLowerCase();
                    if (label.includes(p)) {
                        let parentKey = this._parentIndex ? this._parentIndex[nodeKey] : null;
                        while (parentKey) {
                            next.add(parentKey);
                            parentKey = this._parentIndex[parentKey];
                        }
                    }
                }
                this.setExpandedKeys(Array.from(next));
            },
            childrenOf(node) {
                return node[this.childrenField] || [];
            },
            hasChildren(node) {
                const children = node[this.childrenField];
                return children && children.length > 0;
            },
            isLeaf(node) {
                const flag = node && node[this.isLeafField];
                return flag === true;
            },
            isExpanded(node) {
                const nodeKey = this.keyOf(node);
                return new Set(this.getEffectiveExpandedKeys()).has(nodeKey);
            },
            isChecked(node) {
                const nodeKey = this.keyOf(node);
                return new Set(this.getEffectiveCheckedKeys()).has(nodeKey);
            },
            isIndeterminate(node) {
                if (!this.cascade) return false;
                const children = this.childrenOf(node);
                if (!children || children.length === 0) return false;

                let checkedCount = 0;
                let indeterminateCount = 0;

                for (const child of children) {
                    if (this.isChecked(child)) {
                        checkedCount++;
                    } else if (this.isIndeterminate(child)) {
                        indeterminateCount++;
                    }
                }

                // 如果有选中的子节点但不是全部选中，或者有不确定状态的子节点，则当前节点为不确定状态
                return (
                    (checkedCount > 0 && checkedCount < children.length) ||
                    indeterminateCount > 0
                );
            },
            isSelected(node) {
                return this.selectable && this.selectedKey === this.keyOf(node);
            },
			contentStyle(node) {
                const style = {};
                if (this.isSelected(node) && this.selectedBgColor) {
                    style.background = this.selectedBgColor;
                }
                return style;
            },
            labelStyle(node) {
                const style = {};
                if (this.pattern && node.__matched && this.highlightBgColor) {
                    style.backgroundColor = this.highlightBgColor;
                }
                return style;
            },
            nodeWrapperStyle(node) {
                return {
                    paddingLeft: uni.$u.addUnit(
                        (node.__level || 0) * Number(this.indentWidth),
                    ),
                };
            },
            onToggle(node) {
				const nodeKey = this.keyOf(node);
				this.selectedKey = nodeKey;
                if (!this.hasChildren(node) && (!this.loadNode || this.isLeaf(node))) return;
				
                const expanded = this.isExpanded(node);
                let next = new Set(this.getEffectiveExpandedKeys());
                if (expanded){
					next.delete(nodeKey);
				} else {
					next.add(nodeKey);
				}
				
                this.setExpandedKeys(Array.from(next));
                if (!expanded && this.loadNode && !this.hasChildren(node) && !this.isLeaf(node)) {
                    this.setLoading(node, true);
                    this.ensureNodeIndexesBuilt();
                    const sourceNode = this._nodeIndex[nodeKey];
                    Promise.resolve(this.loadNode(sourceNode)).finally(() => {
                        this.indexSubtree(sourceNode);
                        this.setLoading(node, false);
                    });
                }
            },
            handleCheck(node) {
                if (!!node[this.disabledField]) return;
                const nodeKey = this.keyOf(node);
                let current = new Set(this.getEffectiveCheckedKeys());
                const checked = current.has(nodeKey);

                if (checked) {
                    current.delete(nodeKey);
                } else {
                    current.add(nodeKey);
                }

                if (this.cascade) {
                    // 级联对子孙生效
                    const affectDescendants = (n, value) => {
                        const descendantKey = this.keyOf(n);
                        if (value) {
                            current.add(descendantKey);
                        } else {
                            current.delete(descendantKey);
                        }
                        for (const childNode of this.childrenOf(n)) {
                            affectDescendants(childNode, value);
                        }
                    };

                    // 级联对祖先生效
                    const affectAncestors = (n) => {
                        const parent = this.findParent(
                            this.data,
                            this.keyOf(n),
                        );
                        if (!parent) return;

                        const parentKey = this.keyOf(parent);
                        const siblings = this.childrenOf(parent);
                        let allChecked = true;
                        let anyChecked = false;

                        for (const sibling of siblings) {
                            const siblingKey = this.keyOf(sibling);
                            if (current.has(siblingKey)) {
                                anyChecked = true;
                            } else {
                                allChecked = false;
                            }
                        }

                        if (allChecked) {
                            current.add(parentKey);
                        } else {
                            current.delete(parentKey);
                        }

                        // 递归处理上级父节点
                        affectAncestors(parent);
                    };

                    // 先处理子孙节点
                    affectDescendants(node, !checked);
                    // 再处理祖先节点
                    affectAncestors(node);
                }

                this.setCheckedKeys(Array.from(current));
            },
            getSiblings(node) {
                const nodeKey = this.keyOf(node);
                const res = this.findParentAndSiblings(this.data, null, nodeKey);
                return res && res.siblings ? res.siblings : [];
            },
            findParentAndSiblings(nodes, parent, targetKey) {
                if (!nodes) return null;
                for (const n of nodes) {
                    const nodeKey = this.keyOf(n);
                    if (nodeKey === targetKey) {
                        return {
                            parent,
                            siblings: parent
                                ? (parent[this.childrenField] || []).filter(
                                      (sibling) => this.keyOf(sibling) !== targetKey,
                                  )
                                : [],
                        };
                    }
                    const found = this.findParentAndSiblings(
                        n[this.childrenField],
                        n,
                        targetKey,
                    );
                    if (found) return found;
                }
                return null;
            },
            findParent(nodes, targetKey, parent = null) {
                if (!nodes) return null;
                for (const n of nodes) {
                    const nodeKey = this.keyOf(n);
                    if (nodeKey === targetKey) {
                        return parent;
                    }
                    const found = this.findParent(
                        n[this.childrenField],
                        targetKey,
                        n,
                    );
                    if (found) return found;
                }
                return null;
            },
            hasDescendantMatch(node) {
                if (!this.pattern) return false;
                const stack = [...(this.childrenOf(node) || [])];
                while (stack.length) {
                    const n = stack.pop();
                    if (!n) continue;
                    const label = (n[this.labelField] + '').toLowerCase();
                    if (label.includes(this.pattern.toLowerCase())) return true;
                    stack.push(...(this.childrenOf(n) || []));
                }
                return false;
            },
            setLoading(node, value) {
                const key = this.keyOf(node);
                if (!this.loadingMap) this.loadingMap = {};
                if (this.$set) {
                    this.$set(this.loadingMap, key, value);
                } else {
                    this.loadingMap = { ...this.loadingMap, [key]: value };
                }
            },
            isLoading(node) {
				const key = this.keyOf(node);
                return !!(this.loadingMap && this.loadingMap[key]);
            },
            setExpandedKeys(next) {
                if (this.expandedKeys) {
                    this.$emit('update:expanded-keys', next);
                    this.$emit('expanded', next);
                } else {
                    this.innerExpandedKeys = next;
                    this.$emit('expanded', next);
                }
            },
            setCheckedKeys(next) {
                if (this.checkedKeys) {
                    this.$emit('update:checked-keys', next);
                    this.$emit('checked', next);
                } else {
                    this.innerCheckedKeys = next;
                    this.$emit('checked', next);
                }
            },
        },
    };
</script>

<style lang="scss" scoped>
    @import '../../libs/css/components.scss';

    .u-tree {
       
        &__nodes {
			@include flex(column);
        }

        &__node-wrapper {
			@include flex(row);
            align-items: center;
        }

        &__switcher {
			margin-right: 6px;
        }

        &__content {
            flex: 1;
			border-radius: 4px;
			padding: 2px 0px;
        }

        &__label {
            //#ifndef APP-NVUE
            display: inline-block;
            //#endif
            
			font-size: 14px;
			border-radius: 4px;
			padding: 2px 0px;
        }
    }
</style>
