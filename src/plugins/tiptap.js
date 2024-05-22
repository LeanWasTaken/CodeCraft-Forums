import {
  VuetifyTiptap,
  VuetifyViewer,
  createVuetifyProTipTap,
} from 'vuetify-pro-tiptap';
import {
  BaseKit,
  Bold,
  Italic,
  Underline,
  Strike,
  Color,
  Highlight,
  Heading,
  FontSize,
  SubAndSuperScript,
  Link,
  Table,
  Blockquote,
  HorizontalRule,
  Code,
  CodeBlock,
  Clear,
  History,
} from 'vuetify-pro-tiptap';
import 'vuetify-pro-tiptap/style.css';

export const vuetifyProTipTap = createVuetifyProTipTap({
  components: {
    VuetifyTiptap,
    VuetifyViewer,
  },
  extensions: [
    BaseKit.configure({
      placeholder: {
        placeholder: 'Enter some text...',
      },
    }),
    Bold,
    Italic,
    Underline,
    Strike,
    Code.configure({ divider: true }),
    Heading,
    FontSize,
    Color,
    Highlight.configure({ divider: true }),
    SubAndSuperScript.configure({ divider: true }),
    Clear.configure({ divider: true }),
    Link,
    /*Image.configure({
      imageTabs: [{ name: 'SELECT', component: markRaw(SelectImage) }],
      // hiddenTabs: ['upload'],
      upload(file: File) {
        const url = URL.createObjectURL(file)
        console.log('mock upload api :>> ', url)
        return Promise.resolve(url)
      }
    }),*/
    Table.configure({ divider: true }),
    Blockquote,
    HorizontalRule,
    CodeBlock.configure({ divider: true }),
    History.configure({ divider: true }),
  ],
});
