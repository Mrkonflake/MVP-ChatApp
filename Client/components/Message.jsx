let Message = ({m, dateFormat}) => {
  let messageFormatDate = () => {
    let result = dateFormat(m.created_at);
    return result;
  }
  return (
    <>
    <div className="flex gap-4">
     <p className='text-zinc-300'>{messageFormatDate()}</p>
      <p className="font-bold whitespace-nowrap">{m.username}:</p>
       <p>{m.message}</p>
    </div>
       <hr></hr>
    </>
  )
}
export default Message;