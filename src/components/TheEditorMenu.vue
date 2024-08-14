<template>
  <div
    v-if="isEditable"
    class="flex items-center"
  >
    <!-- Text Decoration Area -->
    <div class="flex gap-x-3 border-r-2 border-gray pr-4">
      <Dropdown
        :distance="6"
        placement="left"
        :skidding="25"
      >
        <BaseEditorButton
          :tool-tip-content="'<kbd>Cmd</kbd> + <kbd>Alt</kbd> + <kbd>1〜3</kbd>'"
          width-num="w-10"
          size="sm"
          :is-active="editor.isActive('heading')"
        >
          <template #icon>
            <IconLoader name="heading" />
          </template>
        </BaseEditorButton>
        <template #popper>
          <div class="flex flex-col">
            <button
              v-for="count in HEADING_LEVEL"
              :key="count"
              class="h-6 px-4 font-bold hover:bg-gray"
              :class="headingButtonClass(count)"
              @click="() => onHeading(count)"
            >
              {{ `H${count}` }}
            </button>
          </div>
        </template>
      </Dropdown>
      <BaseEditorButton
        :tool-tip-content="'<kbd>Cmd</kbd> + <kbd>B</kbd>'"
        width-num="w-10"
        size="sm"
        :is-active="editor.isActive('bold')"
        @on-click="onBold"
      >
        <template #icon>
          <IconLoader name="bold" />
        </template>
      </BaseEditorButton>
      <BaseEditorButton
        :tool-tip-content="'<kbd>Cmd</kbd> + <kbd>I</kbd>'"
        width-num="w-10"
        size="sm"
        :is-active="editor.isActive('italic')"
        @on-click="onItalic"
      >
        <template #icon>
          <IconLoader name="italic" />
        </template>
      </BaseEditorButton>
      <BaseEditorButton
        :tool-tip-content="'<kbd>Cmd</kbd> + <kbd>U</kbd>'"
        width-num="w-10"
        size="sm"
        :is-active="editor.isActive('underline')"
        @on-click="onUnderline"
      >
        <template #icon>
          <IconLoader name="underline" />
        </template>
      </BaseEditorButton>
      <BaseEditorButton
        :tool-tip-content="'<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd>'"
        width-num="w-10"
        size="sm"
        :is-active="editor.isActive('strike')"
        @on-click="onStrikethrough"
      >
        <template #icon>
          <IconLoader name="strikethrough" />
        </template>
      </BaseEditorButton>
    </div>
    <!-- Color Adjustment Area -->
    <div class="flex gap-x-3 border-r-2 border-gray px-4">
      <Dropdown
        popperClass="w-28"
        placement="bottom"
      >
        <BaseEditorButton
          :is-tool-tip-disabled="true"
          width-num="w-10"
          size="sm"
          :is-active="isFontActive"
        >
          <template #icon>
            <IconLoader name="font" />
          </template>
        </BaseEditorButton>
        <template #popper>
          <div class="flex flex-col">
            <button
              v-for="(value, key) in FONT_COLOR"
              :key="key"
              class="h-6 text-left hover:bg-gray"
              @click="() => onColor(value.code)"
            >
              <span :class="`font-bold ${value.color}`">A </span>{{ value.label }}
            </button>
          </div>
        </template>
      </Dropdown>
      <Dropdown
        popperClass="w-24"
        placement="bottom"
      >
        <BaseEditorButton
          :is-tool-tip-disabled="true"
          width-num="w-10"
          size="sm"
          :is-active="editor.isActive('highlight')"
        >
          <template #icon>
            <IconLoader name="palette" />
          </template>
        </BaseEditorButton>
        <template #popper>
          <div class="flex flex-col">
            <button
              v-for="(value, key) in HIGHLIGHT_COLOR"
              :key="key"
              class="h-6 text-left hover:bg-gray"
              @click="() => onHighlight(value.code)"
            >
              <div class="flex gap-x-2">
                <div :class="`w-6 rounded-full text-center font-bold ${value.color}`">A</div>
                <p>{{ value.label }}</p>
              </div>
            </button>
          </div>
        </template>
      </Dropdown>
    </div>
    <div class="flex gap-x-3 border-r-2 border-gray px-4">
      <BaseEditorButton
        :tool-tip-content="'<kbd>Cmd</kbd> + <kbd>E</kbd>'"
        width-num="w-10"
        size="sm"
        :is-active="editor.isActive('code')"
        @on-click="onCode"
      >
        <template #icon>
          <IconLoader name="code" />
        </template>
      </BaseEditorButton>
      <BaseEditorButton
        :tool-tip-content="'<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd>'"
        width-num="w-10"
        size="sm"
        :is-active="editor.isActive('blockquote')"
        @on-click="onBlockQuote"
      >
        <template #icon>
          <IconLoader name="quote-left" />
        </template>
      </BaseEditorButton>
      <BaseEditorButton
        :is-tool-tip-disabled="true"
        width-num="w-10"
        size="sm"
        @on-click="onHorizontalRule"
      >
        <template #icon>
          <IconLoader name="ruler-horizontal" />
        </template>
      </BaseEditorButton>
    </div>
    <div class="flex gap-x-3 border-r-2 border-gray px-4">
      <BaseEditorButton
        :tool-tip-content="'<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>8</kbd>'"
        width-num="w-10"
        size="sm"
        :is-active="editor.isActive('bulletList')"
        @on-click="onBulletList"
      >
        <template #icon>
          <IconLoader name="list-ul" />
        </template>
      </BaseEditorButton>
      <BaseEditorButton
        :tool-tip-content="'<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>7</kbd>'"
        width-num="w-10"
        size="sm"
        :is-active="editor.isActive('orderedList')"
        @on-click="onOrderedList"
      >
        <template #icon>
          <IconLoader name="list-ol" />
        </template>
      </BaseEditorButton>
      <Menu
        popperClass="w-40"
        placement="bottom-start"
      >
        <BaseEditorButton
          :tool-tip-content="`
        <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> : Left<br/>
        <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> : Right<br/>
        <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>E</kbd> : Center<br/>
        <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>J</kbd> : Justify<br/>
        `"
          width-num="w-10"
          size="sm"
          :is-active="isFontActive"
        >
          <template #icon>
            <IconLoader name="align-justify" />
          </template>
        </BaseEditorButton>
        <template #popper>
          <div class="flex flex-col">
            <template
              v-for="(value, key, index) in ALIGN_TYPE"
              :key="key"
            >
              <button
                class="h-6 text-left hover:bg-gray"
                :class="{ 'bg-gray-dark': editor.isActive({ textAlign: key.toLowerCase() }) }"
                @click="() => onTextAlign(key)"
              >
                <IconLoader
                  class="mr-3 inline"
                  :name="value.pathName"
                />
                <span class="text-sm font-bold">{{ value.label }}</span>
              </button>
              <button
                v-if="index === Object.keys(ALIGN_TYPE).length - 1"
                class="h-6 text-left hover:bg-gray"
                @click="() => editor.chain().focus().unsetTextAlign().run()"
              >
                <span class="text-sm font-bold">Unset Text Align</span>
              </button>
            </template>
          </div>
        </template>
      </Menu>
    </div>
    <BaseSquareButton
      class="ml-4"
      color="blue"
      width-num="w-18"
      size="md"
      :disabled="isLoading"
      @on-click="submitHandler"
    >
      <template #text>Save</template>
    </BaseSquareButton>
  </div>
</template>

<script setup lang="ts">
  import { Level } from '@tiptap/extension-heading'
  import { Editor } from '@tiptap/vue-3'
  import { Dropdown, Menu } from 'floating-vue'
  import 'floating-vue/dist/style.css'
  import { computed } from 'vue'
  import IconLoader from '../components/svg/IconLoader.vue'
  import { ALIGN_TYPE, FONT_COLOR, HIGHLIGHT_COLOR } from '../types/const'
  import BaseEditorButton from './base/BaseEditorButton.vue'
  import BaseSquareButton from './base/BaseSquareButton.vue'

  const HEADING_LEVEL = [1, 2, 3] as const

  const props = defineProps<{
    editor: Editor
    isEditable: boolean
    isLoading: boolean
    submitHandler: () => void
  }>()

  const isFontActive = computed(() => {
    // if the selected area is default, return false
    if (props.editor.getAttributes('textStyle').color === '') {
      return false
    }
    for (const key in FONT_COLOR) {
      if (FONT_COLOR[key as keyof typeof FONT_COLOR].code === props.editor.getAttributes('textStyle').color) {
        return true
      }
    }
    return false
  })

  const headingButtonClass = (level: Level) => {
    let classValue = ''
    switch (level) {
      case 1:
        classValue = 'text-lg'
        break
      case 2:
        classValue = 'text-base'
        break
      case 3:
        classValue = 'text-sm'
        break
      default:
        break
    }
    return classValue.concat(props.editor.isActive('heading', { level }) ? ' bg-gray-dark' : '')
  }

  const onHeading = (level: Level) => props.editor.chain().focus().toggleHeading({ level: level }).run()
  const onBold = () => props.editor.chain().focus().toggleBold().run()
  const onItalic = () => props.editor.chain().focus().toggleItalic().run()
  const onUnderline = () => props.editor.chain().focus().toggleUnderline().run()
  const onStrikethrough = () => props.editor.chain().focus().toggleStrike().run()
  const onCode = () => props.editor.chain().focus().toggleCode().run()
  const onBlockQuote = () => props.editor.chain().focus().toggleBlockquote().run()
  const onHorizontalRule = () => props.editor.chain().focus().setHorizontalRule().run()
  const onBulletList = () => props.editor.chain().focus().toggleBulletList().run()
  const onOrderedList = () => props.editor.chain().focus().toggleOrderedList().run()

  const onColor = (color: string) => {
    // if the selected color is the same color of text, unset the color
    props.editor.getAttributes('textStyle').color === color
      ? props.editor.commands.unsetColor()
      : props.editor.chain().focus().setColor(color).run()
  }
  const onHighlight = (color: string) => {
    // if the selected color is the same color of highlight, unset the highlight
    props.editor.chain().focus().toggleHighlight({ color }).run()
  }
  const onTextAlign = (type: keyof typeof ALIGN_TYPE) =>
    props.editor.chain().focus().setTextAlign(type.toLowerCase()).run()
</script>
