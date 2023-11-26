import SignForm from '../../components/SignForm';



const Email = ({ onSubmit, email, setEmail }) => {
  return (
    <SignForm.Form onSubmit={onSubmit}>
      <SignForm.Title>Create your Gmail address</SignForm.Title>
      <SignForm.Subtitle>Create your own email address</SignForm.Subtitle>

      <SignForm.InputWrapper>
        <SignForm.Input
          value={email}
          onChange={setEmail}
          placeholder='Create a Gmail address'
        />
      </SignForm.InputWrapper>
      <span className='self-start mt-1 ml-4 text-xs text-neutral-500'>You can use letters, numbers & periods</span>

      <SignForm.ButtonWrapper>
        <div />
        <SignForm.Button isThemePrimary type='submit'>Next</SignForm.Button>
      </SignForm.ButtonWrapper>
    </SignForm.Form>
  );
};



export default Email;
