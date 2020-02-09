import React, { Fragment } from 'react';
import { Input, TextArea } from '../../common/Forms';
import { Section, Header2 } from '../../common/Structure';
import { font } from '../../../constants/style-guide';

// this.editor = CodeMirror.fromTextArea(this.editorRef.current, this.props);
// this.editor.on('change', this.handleChange);

export const PostEditor = ({ post, onChange }) => {
  return (
    <Fragment>
      <Section>
        <Header2>Title</Header2>
        <Input onChange={(e) => onChange({ ...post, title: e.target.value })} value={post.title} />
      </Section>
      <Section>
        <Header2>Content</Header2>
        <TextArea
          style={{
            fontSize: font.size.regular,
          }}
          rows={30}
          onChange={(e) => onChange({ ...post, content: e.target.value })}
          value={post.content}
        />
      </Section>
    </Fragment>
  );
};
