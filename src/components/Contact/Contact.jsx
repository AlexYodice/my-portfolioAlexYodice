import React,{useState, useRef} from 'react'
import emailjs from "@emailjs/browser";
import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import './Contact.css'

const Contact = () => {
    const form = useRef();
    const [done, setDone] = useState(false)
    const [notDone, setNotDone] = useState(false)
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    // Get EmailJS config from environment variables
    const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
        setDone(false)
        setNotDone(false)
    }

    const sendEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        setDone(false);
        setNotDone(false);
        
        // Validate form fields
        if(!formData.from_name || !formData.reply_to || !formData.message){
            setNotDone(true);
            setLoading(false);
            return;
        }

        // Validate EmailJS config
        if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
            console.error('EmailJS configuration missing. Please check your .env file.');
            console.error('Missing:', {
                serviceId: !EMAILJS_SERVICE_ID,
                templateId: !EMAILJS_TEMPLATE_ID,
                publicKey: !EMAILJS_PUBLIC_KEY
            });
            setNotDone(true);
            setLoading(false);
            return;
        }

        try {
            // Try sendForm first (preferred method)
            const result = await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                form.current,
                EMAILJS_PUBLIC_KEY
            );

            console.log('EmailJS success:', result);
            console.log('Status:', result.status);
            console.log('Text:', result.text);
            setDone(true);
            setFormData({}); // Clear form
            form.current?.reset(); // Reset form
        } catch (error) {
            // Detailed error logging
            console.error('EmailJS Error Details:');
            console.error('Error object:', error);
            console.error('Error status:', error.status);
            console.error('Error text:', error.text);
            console.error('Error message:', error.message);
            console.error('Full error:', JSON.stringify(error, null, 2));

            // Check for "Invalid grant" error (Gmail OAuth token expired)
            const errorText = error.text || error.message || '';
            const isInvalidGrant = errorText.includes('Invalid grant') || 
                                  errorText.includes('Gmail_API') ||
                                  (error.status === 412 && errorText.includes('grant'));

            if (isInvalidGrant) {
                console.error('❌ Gmail OAuth token expired. Please reconnect Gmail in EmailJS dashboard.');
                console.error('📧 Fix: Go to https://dashboard.emailjs.com/admin/service → Edit Service → Disconnect & Reconnect Gmail');
                setNotDone(true);
                // Show user-friendly error message
                alert('Email service error: Gmail connection expired. Please contact the site administrator.');
                setLoading(false);
                return;
            }

            // If sendForm fails due to CORS (status 412 or network error), try send method
            if (error.status === 412 || error.message?.includes('CORS') || error.message?.includes('Network')) {
                console.log('Attempting fallback to emailjs.send method...');
                try {
                    const sendResult = await emailjs.send(
                        EMAILJS_SERVICE_ID,
                        EMAILJS_TEMPLATE_ID,
                        {
                            from_name: formData.from_name,
                            reply_to: formData.reply_to,
                            message: formData.message,
                        },
                        EMAILJS_PUBLIC_KEY
                    );
                    console.log('Fallback send success:', sendResult);
                    setDone(true);
                    setFormData({});
                    form.current?.reset();
                } catch (fallbackError) {
                    console.error('Fallback send also failed:', fallbackError);
                    const fallbackErrorText = fallbackError.text || fallbackError.message || '';
                    if (fallbackErrorText.includes('Invalid grant') || fallbackErrorText.includes('Gmail_API')) {
                        console.error('❌ Gmail OAuth token expired. Please reconnect Gmail in EmailJS dashboard.');
                        alert('Email service error: Gmail connection expired. Please contact the site administrator.');
                    }
                    setNotDone(true);
                }
            } else {
                setNotDone(true);
            }
        } finally {
            setLoading(false);
        }
    };
    

    return(
        <Container style={{paddingTop: '50px'}} >
            <Row >
            <Col md={6} className="c-left" >
            <h1 >Get in Touch</h1>
            <h1 className="yellow">Contact me</h1>
            </Col>
            <Col md={6} className="c-right">
                <form ref={form} onSubmit={sendEmail}>
                <input type="text" name="from_name" className="user"  placeholder="Name" onChange={handleChange}/>
                <input type="email" name="reply_to" className="user" placeholder="Email" onChange={handleChange} />
                <textarea name="message" className="user" placeholder="Message" onChange={handleChange} />
                <span className='not-done' >{notDone && "Please, fill all the input field"}</span>
                <Button 
                    type="submit" 
                    className="button" 
                    disabled={done || loading}
                    style={{ width: 'auto', minWidth: '120px' }}
                >
                    {loading ? 'Sending...' : 'Send'}
                </Button>
                <span className='done'>{done && "Thanks for contacting me and be sure i have recieved your mail. If you are testing this functionality then i am confirming this thing working perfectly fine. If you have any serious query then i will reply. Also if you need me, you can conatct me on Linkedin."}</span>
                </form>
            </Col>
            </Row>
        </Container>
    )
}

export default Contact