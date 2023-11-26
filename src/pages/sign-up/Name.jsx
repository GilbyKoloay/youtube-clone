import SignForm from '../../components/SignForm';



const Name = ({
  onSubmit,
  firstName,
  setFirstName,
  lastName,
  setLastName
}) => {
  return (
    <SignForm.Form onSubmit={onSubmit}>
      <SignForm.Title>Create a Google Account</SignForm.Title>
      <SignForm.Subtitle>Enter your name</SignForm.Subtitle>

      <SignForm.InputWrapper>
        <SignForm.Input
          value={firstName}
          onChange={setFirstName}
          placeholder='First name'
        />
        <SignForm.Input
          value={lastName}
          onChange={setLastName}
          placeholder='Last name (optional)'
        />
      </SignForm.InputWrapper>

      <SignForm.ButtonWrapper>
        <div />
        <SignForm.Button isThemePrimary type='submit'>Next</SignForm.Button>
      </SignForm.ButtonWrapper>
    </SignForm.Form>
  );
};



export default Name;
