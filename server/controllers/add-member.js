const controller = async (req, res) => {
  const { tags, email, firstName, lastName } = req.body;
  try {
    // get lists to find id
    const response = await adapter.get('lists');
    const listId = response.data.lists.length > 1 ? MAILCHIMP_LIST_ID : response.data.lists[0].id;

    // add member to new list
    const members = [
      {
        email_address: email,
        email_type: 'html',
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
        tags,
      },
    ];
    const addResponse = await adapter.post(`lists/${listId}`, { members, update_existing: true });
    const { new_members: newMembers = [], updated_members: updatedMembers = [] } = addResponse.data;
    return res.send({ data: { newMembers, updatedMembers } });
  } catch (err) {
    return res.status(400).send({
      error: err,
      message: 'Unable to add to mailing lists',
    });
  }
};

module.exports = { controller };
