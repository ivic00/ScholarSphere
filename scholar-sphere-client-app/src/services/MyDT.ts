class MyDT {
    public toDate(pubdate: any){
        const publicationDate = new Date(pubdate);

        const formattedDate = publicationDate.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          });
          
        return formattedDate;
    }
}

const myDateTime = new MyDT();

export default myDateTime;