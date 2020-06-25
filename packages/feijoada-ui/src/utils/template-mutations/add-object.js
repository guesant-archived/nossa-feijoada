const ADD_OBJECT = ({ object }) =>
  (state) => ({
    doc: {
      ...state.doc,
      model: {
        ...state.doc.model,
        fabricExported: {
          ...state.doc.model.fabricExported,
          objects: [
            ...state.doc.model.fabricExported.objects,
            object,
          ],
        },
      },
    },
  });

export default ADD_OBJECT;
