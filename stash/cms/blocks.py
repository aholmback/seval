from wagtail.core import blocks

class ContentBlock(blocks.StreamBlock):
    richtext = blocks.RichTextBlock()
